const generateBtn = document.getElementById('generate-btn');
const passwordOutput = document.getElementById('password-output');
const downloadBtn = document.getElementById('download-btn');
const downloadPdfBtn = document.getElementById('download-pdf-btn');
const copyBtn = document.getElementById('copy-btn');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const upperCaseBox = document.getElementById('uppercase');
const lowerCaseBox = document.getElementById('lowercase');
const numberBox = document.getElementById('numbers');
const specialBox = document.getElementById('special');
const customWord = document.getElementById('custom-word');
const passithmDownloadBtn = document.getElementById('passithm-download-btn');

const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const specialChars = '!@#$%^&*()-_=+[]{}|;:",<.>/?';

lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
});

function generatePassword(length, options) {
  let charset = '';
  if (options.uppercase) charset += upperCase;
  if (options.lowercase) charset += lowerCase;
  if (options.numbers) charset += numbers;
  if (options.special) charset += specialChars;

  if (!charset) return 'Please select at least one character type.';

  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);

  let password = '';
  for (let i = 0; i < length - options.word.length; i++) {
    const randomChar = charset[array[i] % charset.length];
    password += randomChar;
  }

  const insertPos = Math.floor(Math.random() * (password.length + 1));
  return password.slice(0, insertPos) + options.word + password.slice(insertPos);

}

function updateStrengthMeter(password) {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const strengthColors = ['#e57373', '#f4b400', '#ffdd57', '#81c784', '#4db6ac'];
  const level = Math.min(score, strengthLabels.length - 1);

  strengthBar.style.width = `${(level + 1) * 20}% `;

  strengthBar.style.backgroundColor = strengthColors[level];
  strengthText.textContent = strengthLabels[level];
}

generateBtn.addEventListener('click', () => {
  const length = parseInt(lengthSlider.value);
  const options = {
    uppercase: upperCaseBox.checked,
    lowercase: lowerCaseBox.checked,
    numbers: numberBox.checked,
    special: specialBox.checked,
    word: customWord.value.trim()
  };

  if (options.word.length > length - 4) {
    alert("Custom word is too long for selected length.");
    return;
  }

  const password = generatePassword(length, options);
  passwordOutput.value = password;
  passwordOutput.style.height = 'auto';
  passwordOutput.style.height = passwordOutput.scrollHeight + 'px';
  updateStrengthMeter(password);
  
  // Animate
  output.classList.remove("animate");
  void output.offsetWidth;
  output.classList.add("animate");
});

copyBtn.addEventListener('click', () => {
  if (passwordOutput.value.trim() === '') {
    alert('Nothing to copy!');
    return;
  }
  passwordOutput.select();
  document.execCommand('copy');
  copyBtn.textContent = "Copied";
  setTimeout(() => copyBtn.textContent = "Copy", 1500);
});

downloadBtn.addEventListener('click', () => {
  if (!passwordOutput.value.trim()) return alert('Please generate a password first.');
  const blob = new Blob([passwordOutput.value], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'password.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

downloadPdfBtn.addEventListener('click', () => {
  if (!passwordOutput.value.trim()) return alert('Please generate a password first.');
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const timestamp = new Date().toLocaleString();
  const vaultroLogoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0EAQAAAAxT8tCAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRP//FKsxzQAAAAlwSFlzAAAAYAAAAGAA8GtCzwAAAAd0SU1FB+kFCAsHCL0EtmEAAB/VSURBVHja7d15vJVVvT/wD3BEEFETNUPtWmS3NOcoRXLIcKjMAafUtPRqlpampXatn966lZoUaYOSdq9zaE6lJooT5JSYKDghjqBHBQERFQ4czu+PdblXc2I4w372fr9fL174wsPZz/Nd+/DZaz1r6Ja0tQUAqLTuSgAAAh0AEOgAgEAHAAQ6AAh0AECgAwACHQAQ6AAg0AEAgQ4ACHQAQKADgEAHAAQ6ACDQAQCBDgACHQAQ6ACAQAcABDoACHQAQKADAAIdABDoACDQAQCBDgAIdABAoAOAQAcABDoAINABAIEOAAIdABDoAIBABwAEOgAIdABAoAMAAh0AEOgAINABAIEOAAh0AECgAwACHQAEOgAg0AEAgQ4ACHQAEOgAgEAHAAQ6ACDQAUCgAwACHQAQ6ACAQAcAgQ4ACHQAQKADAAIdAAQ6ACDQAQCBDgAIdAAQ6ACAQAcABDoAINABQKADAAIdABDoAIBABwCBDgAIdABAoAMAAh0ABDoAINABAIEOAAh0ABDoAIBABwAEOgAg0AFAoCsBAAh0AECgAwACHQAQ6AAg0AEAgQ4ACHQAQKADgEAHAAQ6ACDQAQCBDgACHQAQ6ACAQAcABDoACHQAQKADAAIdABDoACDQAQCBDgB0vCYlgLf6+MeTvfdOfvKTZMEC9ehK3bolP/hBsvbayf33l18TJiSzZ6sNvOlnJWlrUwb4PzvskIwcmayySvK3vyX77ps8+6y6dIUVVkjOPz8ZOvTNf97Wljz5ZAn3O+5Ibr45GT8+WbhQzRDoQJIjjkiGD0+a3jB29eKLyX77JTfdpD6daa21kquvTjbffPG+/qWXkltvLeF+003Jo4+qIQIdGk5TU/KrXyXf/Obb///W1uT445Nhw9SqM3zykyXM+/df+u8xcWIZaRk5MnnsMTVFoEPdW2WV5NJLkyFD3vtr/+u/ksMPT1pa1K2j7Llnct55Zbi9vdx7bwn2Cy9MmpvVGIEOdWfAgOTPf07WX3/x/84ddyS7716G4mnHf4y6Jccdl/z0p0n3Dlp/09JSev6/+EVy111qjkCHurDVVsmVVyarr77kf/fJJ8vkucmT1bE9LL98MmJEcuCBnfeat99eHrNceaWVDAh0qKyDD05+97ukZ8+l/x7PP5/svHOZXc3SW2215PLLk6237prXf/jh5KSTkssu0xZUm41laCg9eiSnn56ce+6yhXmSrLlmcsstyeDB6rq0NtooGTeu68I8KXsOXHppMnp0stlm2gQ9dKh5ffsmF1+cfPGL7ft9X301+fznkzFj1HhJ7LJLaY8VV6yda1q4sFzTd7+bvPCCNkIPHWrO2muXNcrtHeZJ0qdP8te/Jttuq86L66ijyrPrWgrzpEzGO+CAMgx/wAHaCT10qClbblnC4/3v79jXeeWVZKedyix43l7PnmXuwsEHV+N6L7kkOfLIZMYMbYdAhy61//7JOeckvXp1zuvNnFmeqT/0kNr/s379yuS3bbap1nU3N5fZ96NHa0NqmyF36vOTarfk5JOTCy7ovDBPkve9L7nhhmSddbTBG623XlkmVrUwT5IPfCC5/vqyUyDooUMnWmGFstPYnnt23TWMH19mbr/yivbYcceyS9vKK1f/Xn7/+zIEb6dA9NChg621Vplt3pVhniSbbFJOCevWrbHb48gjk2uuqY8wT5JDD01uvLGsnQeBDh1k443LhLTFPZ2ro+22W/L97zdmW/ToUXZhO/PMN59cVw+23joZO7bsQwC1xJA7daEjDvRoD62tZY36DTc0TlssyWE3VTZhQrL99sm0aX7+EOjQLo46qhy20b1Gx5umTUs23LAxNioZMCD5y1/K7muN4IEHSqhPn+7nkK5nyJ3K6tWrHIc5fHjthnlSDn8566z6b49tt03uvrtxwjwpW9eOHl1GJUCgw1JYbbVk1KiyzrwKdtst+drX6rc9DjmktEe/fo33Xtx44/KIod7mClA9htypnA03LGeYr7tuta579uzkYx8rG5XUix49kp/8xBrtJDnjjPL4B7rs57FsvwHVsNNOyXXXVXOG8fLLJ6uumlx9dX20xYorlvXlhxzifZkkn/508uKL5fQ40EOHd3Hsscmpp5ZeYVW1tZWtYau+3/u665ZRkg039L58o/nzy+z+225TCwQ6vEXPnslvf1s/PcE770wGDaru9Q8aVA67WWMN7823M2VKmSw3a5Za0LlMiqOm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'; 
  
  // Add Logo
  doc.addImage(vaultroLogoBase64, 'PNG', 15, 15, 30, 30);

  // Header Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(33, 37, 41); // Dark gray
  doc.text("Passithm Password PDF", 105, 30, { align: "center" });;

  // Subtitle
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.setTextColor(120, 120, 120);
  doc.text("Your custom-generated secure password", 105, 38, { align: "center" });
  
  // Timestamp
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const timestampWidth = doc.getTextWidth(timestamp);
  doc.text(timestamp, 200 - timestampWidth - 15, 15); // Align to right with 15px margin

  
  // Divider Line
  doc.setDrawColor(180);
  doc.line(20, 46, 190, 46);  // Lowering the line by 2 units



  // Password Box
  doc.setFillColor(245, 245, 245);
  doc.setDrawColor(180);
  doc.rect(5, 60, 200, 20, 'FD');
  
  // Password
  doc.setFont("courier", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 180);
  doc.text(passwordOutput.value, 105, 71.5, { align: "center" });

  doc.save('passithm-password.pdf');
});


const aboutBtn = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');
const closeBtn = aboutModal.querySelector('.close');

aboutBtn.addEventListener('click', () => aboutModal.style.display = 'block');
closeBtn.addEventListener('click', () => aboutModal.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === aboutModal) aboutModal.style.display = 'none';
});

const output = document.getElementById("password-output");
output.classList.remove("animate");
void output.offsetWidth; // Force reflow
output.classList.add("animate");

document.getElementById('login-btn').addEventListener('click', function() {
  // Redirect to login.html
  window.location.href = 'login.html';
});

// Event listener for the Logout button
document.getElementById('logout-btn').addEventListener('click', function() {
  // Clear any login-related data (e.g., session or localStorage)
  localStorage.removeItem('userLoggedIn'); // Example, if you're storing login status
  
 
});


// UI toggle based on login status
function updateUI() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const saveBtn = document.getElementById("save-btn");
  const savedBtn = document.getElementById("saved-btn");
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");

  // Show or hide buttons based on login status
  if (isLoggedIn) {
    saveBtn?.classList.remove("hidden");
    savedBtn?.classList.remove("hidden");
    logoutBtn?.classList.remove("hidden");
    loginBtn?.classList.add("hidden");
  } else {
    saveBtn?.classList.add("hidden");
    savedBtn?.classList.add("hidden");
    logoutBtn?.classList.add("hidden");
    loginBtn?.classList.remove("hidden");
  }
}

// Update UI on page load
window.addEventListener("DOMContentLoaded", updateUI);

// Handle login button click
const loginBtn = document.getElementById("login-btn");
loginBtn?.addEventListener("click", () => {
  // Simulate login (replace with actual login logic)
  localStorage.setItem("isLoggedIn", "true");
  updateUI(); // Update UI after login
});

// Handle logout button click
const logoutBtn = document.getElementById("logout-btn");
logoutBtn?.addEventListener("click", () => {
  // Log the user out
  localStorage.setItem("isLoggedIn", "false");
  updateUI(); // Update UI after logout
});
// Elements
const saveBtn = document.getElementById("save-btn");
const savedBtn = document.getElementById("saved-btn");
const passwordoutput = document.getElementById("password-output");
const passwordNameInput = document.getElementById("password-name-input");
const confirmSaveBtn = document.getElementById("confirm-save-btn");
const savedPasswordsList = document.getElementById("saved-passwords-list");
const nameModal = document.getElementById("name-modal");
const savedModal = document.getElementById("saved-modal");
const closeNameModal = document.getElementById("close-name-modal");
const closeSavedModal = document.getElementById("close-saved-modal");

// Get current user
const currentUserEmail = localStorage.getItem("currentUserEmail");

// Load all saved passwords data and isolate current user's list
let savedPasswordsData = JSON.parse(localStorage.getItem("savedPasswordsData")) || {};
let savedPasswords = savedPasswordsData[currentUserEmail] || [];

// Show saved passwords in the modal with copy and delete options
function displaySavedPasswords() {
  savedPasswordsList.innerHTML = "";
  savedPasswords.forEach((passwordData, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${passwordData.name}: ${passwordData.password}`;

    // Copy button
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.classList.add("copy-history-btn");
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(passwordData.password).then(() => {
        alert("Password copied to clipboard!");
      });
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      savedPasswords.splice(index, 1);
      savedPasswordsData[currentUserEmail] = savedPasswords;
      localStorage.setItem("savedPasswordsData", JSON.stringify(savedPasswordsData));
      displaySavedPasswords();
    });

    listItem.appendChild(copyBtn);
    listItem.appendChild(deleteBtn);
    savedPasswordsList.appendChild(listItem);
  });
}

// Save password with a name
confirmSaveBtn.addEventListener("click", () => {
  const password = passwordOutput.value;
  const passwordName = passwordNameInput.value.trim();

  if (passwordName && password) {
    savedPasswords.push({ name: passwordName, password: password });
    savedPasswordsData[currentUserEmail] = savedPasswords;
    localStorage.setItem("savedPasswordsData", JSON.stringify(savedPasswordsData));

    passwordNameInput.value = "";
    nameModal.style.display = "none";
    displaySavedPasswords();
  } else if (!password) {
    alert("Please generate a password first.");
  } else {
    alert("Please enter a name for the password.");
  }
});

// Open save password modal
saveBtn.addEventListener("click", () => {
  if (!passwordOutput.value) {
    alert("Please generate a password first.");
  } else {
    nameModal.style.display = "block";
  }
});

// Close save password modal
closeNameModal.addEventListener("click", () => {
  nameModal.style.display = "none";
});

// Open saved passwords modal
savedBtn.addEventListener("click", () => {
  savedModal.style.display = "block";
  displaySavedPasswords();
});

// Close saved passwords modal
closeSavedModal.addEventListener("click", () => {
  savedModal.style.display = "none";
});

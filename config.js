// config.js - Manage environment variable configuration

// Initialize the options object to hold the configuration values
const options = {};

// Check and set the encoding configuration from the environment variables
if (process.env.DOTENV_CONFIG_ENCODING != null) {
  options.encoding = process.env.DOTENV_CONFIG_ENCODING;
}

// Check and set the path of the .env file from the environment variables
if (process.env.DOTENV_CONFIG_PATH != null) {
  options.path = process.env.DOTENV_CONFIG_PATH;
}

// Check and set the debug flag from the environment variables
if (process.env.DOTENV_CONFIG_DEBUG != null) {
  options.debug = process.env.DOTENV_CONFIG_DEBUG;
}

// Check and set whether to override existing environment variables from the environment variables
if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
  options.override = process.env.DOTENV_CONFIG_OVERRIDE;
}

// Check and set the custom dotenv key from the environment variables
if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
  options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
}

// Export the configuration options for use in other files
module.exports = options;

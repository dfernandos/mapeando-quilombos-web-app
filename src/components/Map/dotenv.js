// dotenv.js
const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '.env');
const envExists = fs.existsSync(envPath);

if (envExists) {
  const result = dotenv.config({ path: envPath });

  if (result.error) {
    throw result.error;
  }
}

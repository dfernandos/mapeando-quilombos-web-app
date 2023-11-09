const Dotenv = require('dotenv-webpack');

module.exports = {
  // ... other webpack configurations
  plugins: [
    new Dotenv()
  ]
};

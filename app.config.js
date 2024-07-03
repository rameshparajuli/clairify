const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

module.exports = ({ config }) => {
  return config;
};

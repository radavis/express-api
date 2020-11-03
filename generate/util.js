/**
 * @function timestamp
 * @returns {string} timestamp string in 'YYYYMMDDHHMMSS' format
 */
const timestamp = () =>
  new Date()
    .toISOString()
    .replace(/[TZ-]/g, "")
    .replace(/:/g, "")
    .split(".")[0];

module.exports = {
  timestamp,
};

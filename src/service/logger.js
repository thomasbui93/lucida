/**
 * Log Tracker
 * @param {*} msg 
 */
export const loggerService = (msg) => {
  /* @TODO: Actual log api to save to file */
  console.log(`${new Date()}: ${msg}`);
}
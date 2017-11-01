import path from 'path';
import fs from 'fs';

export const errorHandling = async (err, req, res, next) => {
  await logError(err);
  res.status(400).json({error: err.toString()});
}

export const logError = err => {
  if(!err || typeof err !== 'object') {
    return false;
  }
  const logFolder = path.join(process.cwd(), 'var/log/');
  const fileName = `${new Date().getTime()}.txt`;
  const filePath = path.join(logFolder, fileName);
  return fs.writeFile(filePath, err.stack);
}
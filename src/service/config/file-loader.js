import fs from 'fs';
import path from 'path';

/**
 * Get config file content
 * @returns false | Object
 */
export const getConfig = (envFilePath = 'env.json') => {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), envFilePath), 'utf8'));
  } catch (err) {
    return false;
  }
};

/**
 * Read config by paths
 * @param {*} paths
 * @param {*} delimiter
 */
export const readConfig = (paths, delimiter = '/', envFilePath = 'env.json') => {
  let configSource = getConfig(envFilePath);
  if (!configSource) {
    return false;
  }

  if (typeof paths === 'string' && typeof delimiter === 'string' && delimiter.length > 0) {
    const pathFragments = paths.split(delimiter);
    try {
      pathFragments.forEach(fragment => {
        configSource = configSource[fragment];
      });
      return configSource;
    } catch (error) {
      return undefined;
    }
  } else {
    return undefined;
  }
};

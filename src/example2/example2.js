import fs from 'fs'; // import node module
import { sleep } from 'sleep'; // import standard package.json module

/**
 * Convert fs.readdir to return a promise.
 * @param path
 * @returns {Promise}
 */
function readDirAsync(path) {
  console.log('readDirAsync called with path', path);
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, data) => {
      if (err !== null) return reject(err);
      console.log('shhh...napping for 3 seconds!');
      sleep(3);
      resolve(data);
    });
  });
}

/**
 * @param path
 * @returns {Promise}
 */
async function readDirSync(path) {
  console.log('readDirSync called with path', path);
  let result;
  try {
    result = await readDirAsync(path);
  } catch (err) {
    throw err;
  }

  console.log('readDirSync result is ', result);
  return result;
}

const dir = (process.argv.length > 2 && process.argv[2]) || '.';
console.log('dir is ', dir);

readDirSync(dir).then(res => {
  console.log('Directory list is ', res);
  process.exit(0);
}).catch(err => {
  console.log('Error is ', err);
  process.exit(1);
});

console.log('After promise called');

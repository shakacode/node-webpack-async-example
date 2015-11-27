require('babel/polyfill');

function longFn(param) {
  return new Promise((res, rej) => {
    if (param) {
      setTimeout(res(param), 1000);
    } else {
      rej('ERROR from not passing in a value to longFn');
    }
  });
}

async function asyncFunc(inputToAsync) {
  console.log('f() starting with param: ', inputToAsync);
  let result;
  try {
    result = await longFn(inputToAsync);
  } catch (err) {
    console.log('THROWING err: ' + err);
    throw err;
  }

  return 'RETURN VALUE FROM ASYNC function: ' + result;
}

const promise = asyncFunc('INPUT TO ASYNC FUNCTION');
console.log('1: return value of async function is ', promise);

promise.then(
  res => console.log('1: FINISHED: got back: ' + res)
).catch(
  err => console.log('1: GOT ERROR: err')
);

const promise2 = asyncFunc(false);
console.log('2: return value of async function is ', promise2);

promise2.then(
  res => console.log('2: FINISHED: got back: ' + res)
).catch(
  err => console.log('2: GOT ERROR: err')
);

const log = (...args) => {
  const now = new Date().toLocaleString();
  console.log('\r\n');
  console.log('<- - - - - - start - - - - - -');
  console.log(`${now}`);
  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }
  console.log('- - - - - - end- - - - - - >');
}

const parseQuery = (str) => {
  let arr = str.split('&');
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i].split('=');
    obj[temp[0]] = temp[1];
  }
  log('params is: ', `${JSON.stringify(obj)}`);
  return obj;
}

const sendResponse = {
  success (res, result) {
    const resData = {
      code: 200,
      message: 'success',
      data: result
    };
    res.end(JSON.stringify(resData));
  },
  error (res, msg, result) {
    const resData = {
      code: 200,
      message: msg,
      data: result
    };
    res.end(JSON.stringify(resData));
  }
}

module.exports = {
  log,
  parseQuery,
  sendResponse
}

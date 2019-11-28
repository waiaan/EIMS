const log = (msg) => {
  const now = new Date().toLocaleString();
  console.log('\r\n');
  console.log('<- - - - - - start - - - - - -');
  console.log('\r\n');
  console.log(`${now}`);
  console.dir(msg);
  console.log('\r\n');
  console.log('- - - - - - end- - - - - - >');
}

const parseQuery = (str) => {
  let arr = str.split('&');
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i].split('=');
    obj[temp[0]] = temp[1];
  }
  log(`params is ${JSON.stringify(obj)}`);
  return obj;
}

module.exports = {
  log,
  parseQuery
}

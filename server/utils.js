const log = (msg) => {
  const now = new Date().toLocaleString();
  console.log('\r\n');
  console.log(`${now}  ${msg}`);
}

class UrlParser {
  constructor(url) {
    this.url = url;
    this.api = '';
    this.queryStartIndex = -1;
    this.query = {};
    this._init();
  }
  _init () {
    const matchArr = this.url.match(/^\/(\w+)\??/i);
    if (matchArr === null) return;
    this.api = matchArr[1];
    this.queryStartIndex = matchArr[0].length;
    this._getQuery();
  }
  _getQuery () {
    if (this.queryStartIndex < 0) return;
    let query = this.url.slice(this.queryStartIndex);
    if (query.length < 1) return;
    query = query.split('&');
    for (let i = 0; i < query.length; i++) {
      let q = query[i].split('=');
      this.query[q[0]] = q[1];
    }
  }
}

module.exports = {
  UrlParser,
  log
}

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
    console.log(`incoming api is ${this.api}`);
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
    console.log('incoming query is ' + JSON.stringify(this.query));
  }
}

module.exports = {
  UrlParser
}

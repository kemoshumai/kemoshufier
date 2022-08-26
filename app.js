const fs = require("fs");
const path = require("path");
const {MarkovChain} = require("./MarkovChain");
const src = JSON.parse(fs.readFileSync(path.join(__dirname,"./data/markov.json")));


// マルコフ連鎖を初期化
const markov = new MarkovChain(src);

// 文末まで生成
markov.generateFullSentence();
// markov.generateFullSentence("ミーシェ"); // 先頭を指定

// 生成結果を表示
console.log(markov.getResult().join(" "));
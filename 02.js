const fs = require("fs");
const path = require("path");
const kuromoji = require("kuromoji");

const sourceTweets = fs.readFileSync(path.join(__dirname,"./data/result.txt")).toString().split("\n");

let result = "";

kuromoji.builder({ dicPath:"node_modules/kuromoji/dict" }).build((_,tokenizer) => {
    for(source of sourceTweets)
    {
        const tokenized = tokenizer.tokenize(source);
        result += tokenized.map(i=>i.surface_form).join(' ') + "\n";
    }
    fs.writeFileSync(path.join(__dirname,"./data/words.txt"),result.replace(/ +/g," ").replace(/\n /g,"\n").replaceAll("@ ",""));
});

const fs = require("fs");
const path = require("path");

const words = fs.readFileSync(path.join(__dirname,"./data/words.txt")).toString().replaceAll("\n"," \n ").split(" ");

let result = {};

words.forEach((word, index) => {
    if (index+1 >= words.length) return;
    const nextWord = words[index+1];
    if(!result[word]) result[word] = {};
    if(!result[word][nextWord]) result[word][nextWord] = 0;
    result[word][nextWord] += 1;
});

fs.writeFileSync(path.join(__dirname,"./data/markov.json"), JSON.stringify(result));

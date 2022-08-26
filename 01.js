const fs = require("fs");
const path = require("path");

const tweetSourcecodePath = path.join(__dirname,"./data/tweet.js");
const distTweetSourcecodePath = path.join(__dirname,"./data/tweet_converted.js");
const originalSourcecode = fs.readFileSync(tweetSourcecodePath).toString();
const convertedToModuleExports = originalSourcecode.replace(/^window\.YTD\.tweet\.part0/, "module.exports");
fs.writeFileSync(distTweetSourcecodePath, convertedToModuleExports);

const tweets = require("./data/tweet_converted.js");
const twitter = require('twitter-text');
const cheerio = require('cheerio');

const ignore = [/^RT/,/質問箱/,/熱盛/,/診断/];

let result = "";

const sanitize = full_text => {
    const markedTweet = twitter.autoLink(full_text);
    const $ = cheerio.load(markedTweet);
    $('a').remove();
    return $.text();
}

for({ tweet } of tweets)
{
    const { full_text } = tweet;
    if( ignore.filter(f=>f.test(full_text)).length == 0 )
    {
        // ignoreを通過したツイート
        const sanitizedText = sanitize(full_text);
        if(/^\s*$/.test(sanitizedText)) continue;
        const oneline = sanitizedText.replace(/\n+/g," ");
        result += oneline + "\n";
    }
}

fs.writeFileSync(path.join(__dirname,"./data/result.txt"), result);
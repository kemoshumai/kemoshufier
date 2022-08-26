module.exports.MarkovChain = class MarkovChain
{
    constructor(src)
    {
        this.src = src;
        this.chain = [];
    }
    findNextOne(current)
    {
        const targets = this.src[current];
        const numberOfTargets = Object.values(targets).reduce((a,b)=>a+b);
        const targetNumber = Math.floor(Math.random()*numberOfTargets)+1;
        let rest = targetNumber;
        return Object.keys(targets).find(indexName=>{
            rest -= targets[indexName];
            return rest <= 0;
        });
    }
    pushToChain(value)
    {
        this.chain.push(value);
    }
    getLastOne()
    {
        return this.chain.at(-1);
    }
    generateNextOne()
    {
        this.pushToChain(this.findNextOne(this.getLastOne()));
    }
    generateFullSentence(startOfSentence="\n")
    {
        //? 文末(\n)が来るまでつなげる

        if (startOfSentence!="\n") this.pushToChain(startOfSentence);
        this.pushToChain(this.findNextOne(startOfSentence));
        while(this.getLastOne() != "\n") this.generateNextOne();
    }
    reset()
    {
        this.chain = [];
    }
    getResult()
    {
        return this.chain;
    }
}
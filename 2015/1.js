const { input } = require('./input1.js');
const colors = require('colors');
const programm = () => {
    return new Promise(resolver => {
        console.log(`\n`.bgGray + `\n\n` + `INPUT: \n\n${input}`.dim + `\n` + `\n`.bgGray + `\n`);
        return resolver("Resolving laters...");
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;
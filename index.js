
const colors = require('colors');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Which year do u want to play? '.cyan, nameSequence1 => {
  fs.stat('./' + nameSequence1, function(err, stats) {
    if(err) {
      console.log(`\n`.bgRed + `\n\n` + `the year "${nameSequence1}" can not be found`.red.italic.bold + `\n` + `\n`.bgRed + `\n`);
      rl.close();
      return false
    }

    rl.question('Which day do u want to play? '.cyan, nameSequence2 => {
      const path = './' + [
          nameSequence1,
          nameSequence2
      ].join('/') + '.js'

      console.log(`\n`.bgGray + `\n\n` + `importing file and execute it: ${path}`.dim.italic.bold + `\n` + `\n`.bgGray + `\n`);
      fs.access(path, fs.constants.R_OK, (err) => {
          if(err) {
            console.log(`\n`.bgRed.bold + `\n\n` + `the day "${nameSequence2}" can not be found`.red.italic.bold + `\n` + `\n`.bgRed.bold + `\n`);
            rl.close();
            return false
          }
          const { programm } = require(path);

          programm().then(result => {
              console.log(`\n`.bgGreen + `\n\n` + `Thank you! Your answer is: `.green + `${result}`.white + `\n` + `\n`.bgGreen + `\n\n`)
              rl.close()
          }).catch(err => {
            console.log(`\n`.bgRed.bold + `\n\n` + `the path "${path}" can not be solved`.red.dim.italic.bold + `\n\n${err}\n`.red.italic + `\n`.bgRed.bold + `\n`);
            rl.close()
          })
      });
    })
  })
});
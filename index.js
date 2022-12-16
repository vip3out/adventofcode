
const colors = require('colors');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// const pathparts = [
//   2021,
//   1,
//   1
// ]
// const { programm } = require(`./${pathparts.join("/")}.js`)
// programm(...pathparts).then(result => {
//   console.log(result)
//   rl.close()
// }).catch(err => {
//   console.log(`\n`.bgRed.bold + `\n\n` + `the path "${pathparts.join("/")}" can not be solved`.red.dim.italic.bold + `\n\n${err}\n`.red.italic + `\n`.bgRed.bold + `\n`);
// rl.close()
// })

// return

rl.question('Which year do u want to play? '.cyan, year => {
  const checkPathParts = ['.', year]
  fs.stat(checkPathParts.join("/"), (err, stats) => {
    if(err) {
      console.log(`\n`.bgRed + `\n\n` + `the year "${year}" can not be found`.red.italic.bold + `\n` + `\n`.bgRed + `\n`);
      rl.close();
      return false
    }

    rl.question('Which day do u want to play? '.cyan, day => {
      checkPathParts.push(day)
      fs.stat(checkPathParts.join("/"), (err, stats) => {
        if(err) {
          console.log(`\n`.bgRed + `\n\n` + `the day "${day}" can not be found`.red.italic.bold + `\n` + `\n`.bgRed + `\n`);
          rl.close();
          return false
        }

        rl.question('Which part do u want to play? '.cyan, part => {
          checkPathParts.push(part)
          const path = checkPathParts.join("/") + '.js'
          console.log(`\n`.bgGray + `\n\n` + `importing file and execute it: ${path}`.dim.italic.bold + `\n` + `\n`.bgGray + `\n`);
          fs.access(path, fs.constants.R_OK, (err) => {
            if(err) {
              console.log(`\n`.bgRed.bold + `\n\n` + `the day "${day}" with part ${part} can not be found`.red.italic.bold + `\n` + `\n`.bgRed.bold + `\n`);
              rl.close();
              return false
            }
            const { programm } = require(path);
            checkPathParts.shift()
            programm(...checkPathParts).then(result => {
                console.log(`\n`.bgGreen + `\n\n` + `Thank you! Your answer is: `.green + `${result}`.white + `\n` + `\n`.bgGreen + `\n\n`)
                rl.close()
            }).catch(err => {
              console.log(`\n`.bgRed.bold + `\n\n` + `the path "${path}" can not be solved`.red.dim.italic.bold + `\n\n${err}\n`.red.italic + `\n`.bgRed.bold + `\n`);
              rl.close()
            })
          });
        })
      })
    })
  })
})
const { readInputFileToArray, input_logger } = require('../../helper.js')
const colors = require('colors');

const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      // const input_path = `./${year}/${day}/input${input_part}.txt`
      const input_path = `./${year}/${day}/test.txt`
      readInputFileToArray(input_path, "\n")
        .then(ops => {
          var value = 0
          var opindex = 0
          var opscounter = new Array(ops.length).fill(1) 
          while(opindex < ops.length) {

            console.log(ops[opindex])
            var [code, argument] = ops[opindex].split(" ")
            argument = parseInt(argument)

            opscounter[opindex]--
            value = code === 'acc'
              ? value +  argument
              : value
            opindex = code === 'jmp'
              ? opindex + argument
              : opindex+1

            
            console.info("test".blue.bold, ops[opindex])
            if(opscounter[opindex] === 0) {
              // op wrong
              console.log("wrong".red.bold, ops[opindex])
              ops[opindex] = ops[opindex].replace('jmp', '!jmp').replace('nop', 'jmp')
            }
          }
          return resolver(
            ops
          )
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;

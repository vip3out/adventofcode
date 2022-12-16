const { readInputFileToArray, input_logger } = require('../../helper.js')

const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      const input_path = `./${year}/${day}/input${input_part}.txt`
      // const input_path = `./${year}/${day}/test.txt`
      readInputFileToArray(input_path, "\n")
        .then(ops => {
          var value = 0
          var opindex = 0
          var opscounter = new Array(ops.length).fill(1) 
          while(opscounter[opindex] > 0) {
            var [code, argument] = ops[opindex].split(" ")
            argument = parseInt(argument)

            opscounter[opindex]--;
            value = code === 'acc'
              ? value +  argument
              : value
            opindex = code === 'jmp'
              ? opindex +  argument
              : opindex+1
          }
          return resolver(
            value
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

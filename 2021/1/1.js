const { readInputFileToArray, input_logger, debug } = require('../../helper.js')

const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      const input_path = `./${year}/${day}/input${input_part}.txt`
      // const input_path = `./${year}/${day}/example${input_part}.txt`
      readInputFileToArray(input_path, "\n", "int")
        .then(input => {
          input_logger(input)

          let result = 0

          while(prev = input.shift()) {
            if(input[0] > prev) {
              result++;
            }
          }

          return resolver(result)
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;
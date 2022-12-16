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

          let sums = []
          let sumIndex = 0
          let counter = 0
          while(num = input.shift()) {
            if(input.length > 0) {
              const [a, b] = input
              sums.push(num + a + b)
            }
          }

          sums = sums.filter(n => !!n);
          // console.log(sums)
          while(prev = sums.shift()) {
            if(sums[0] > prev) {
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
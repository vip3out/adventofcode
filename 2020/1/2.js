const { readInputFileToArray, input_logger, debug } = require('../../helper.js')

const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      const input_path = `./${year}/${day}/input${input_part}.txt`
      readInputFileToArray(input_path, "\n", "int")
        .then(input => {
          input_logger(input)
          
          let result = 0
          let i = 0
          let y = 1
          let z = 2
          
          while(i<input.length) {
            while(y<input.length) {
              while(z<input.length) {
                if(input[i] + input[y] + input[z] === 2020) {
                  result = input[i] * input[y] * input[z]
                  i = z = y = input.length
                }
                z++
              }
              z=0
              y++
            }
            y=0
            i++
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
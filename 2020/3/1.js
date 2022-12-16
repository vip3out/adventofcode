const { readInputFileToArray, input_logger, debug } = require('../../helper.js')

const { count_trees } = require('./helper.js')

const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      const input_path = `./${year}/${day}/input${input_part}.txt`
      readInputFileToArray(input_path, "\n")
        .then(input => {
          input_logger(input)
          input = input.map(row => row.split(''))
          const slope_conf = [
            [3,1]
          ]
        
          return resolver(
            slope_conf
              .map(slope => count_trees(input, ...slope))
              .reduce((p,c) => p*c, 1) 
          ); 
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;
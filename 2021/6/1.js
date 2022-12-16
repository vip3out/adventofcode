const { readInputFileToArray, input_logger } = require('../../helper.js')

const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      const input_path = `./${year}/${day}/input${input_part}.txt`
      // const input_path = `./${year}/${day}/test.txt`
      readInputFileToArray(input_path, "\n\n")
        .then(groups => {
          return resolver(
            groups.map(
              group => group.split("\n")
                .reduce(
                  (prev, curr) => [...new Set([...curr.split(""), ...prev])], 
                  []
                )
            ).reduce((prev, curr) => prev + curr.length,0)
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

const { readInputFileToArray, input_logger, debug } = require('../../helper.js')

const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      const input_path = `./${year}/${day}/input${input_part}.txt`
      readInputFileToArray(input_path, "\n")
        .then(input => {
          input_logger(input)
          
          return resolver(
            input.map(
              int => {
                var [counts, char, password] = int.replace(':', '').split(" ")
                counts = counts.split('-')              
                return (
                  counts
                    .map(c => password[c-1])
                    .join()
                    .match(new RegExp(char, "g")) || []
                  ).length === 1
              }
            )
            .filter(r=>r)
            .length
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
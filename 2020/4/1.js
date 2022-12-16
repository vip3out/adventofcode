const { readInputFileToArray, input_logger, debug } = require('../../helper.js')
const { build_objects, valid_objects_by_fields } = require('./helper')
const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      const input_path = `./${year}/${day}/input${input_part}.txt`
      // const input_path = `./${year}/${day}/test.txt`
      const validateOptions = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"]
      readInputFileToArray(input_path, "\n\n")
        .then(input => {
          input_logger(input)
          return resolver(
            valid_objects_by_fields(
              build_objects(input),
              "cid",
              8
            ).length
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
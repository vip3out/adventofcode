const { readInputFileToArray, input_logger } = require('../../helper.js')
const { build_objects, validate_units, validate_year, validate_hex, validate_strings, validate_pid, valid_objects_by_fields, valid_objects_by_values } = require('./helper')
const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      const input_path = `./${year}/${day}/input${input_part}.txt`
      // const input_path = `./${year}/${day}/test.txt`
      const validateOptions = {
        byr: (v) => validate_year(v, [1920, 2002]),
        iyr: (v) => validate_year(v, [2010, 2020]),
        eyr: (v) => validate_year(v, [2020, 2030]),
        hgt: (v) => validate_units(v, [ [ "cm", [150, 193] ], [ "in", [59, 76] ] ]),
        hcl: (v) => validate_hex(v),
        ecl: (v) => validate_strings(v, "amb|blu|brn|gry|grn|hzl|oth"),
        pid: (v) => validate_pid(v),
        cid: (v) => true
      }
      readInputFileToArray(input_path, "\n\n")
        .then(input => {
          input_logger(input)
          var valid_objects = valid_objects_by_fields(
            build_objects(input),
            "cid",
            8
          )
          
          return resolver(
            valid_objects_by_values(
              valid_objects, validateOptions
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
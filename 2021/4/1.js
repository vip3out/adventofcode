const { readInputFileToArray, input_logger, debug } = require('../../helper.js')
const { build_objects, valid_objects_by_fields } = require('./helper')
const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      const input_path = `./${year}/${day}/input${input_part}.txt`
      // const input_path = `./${year}/${day}/example${input_part}.txt`
      const validateOptions = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"]
      readInputFileToArray(input_path, "\n\n")
        .then(input => {
          input_logger(input)
          var [
            numbers,
            ...boards
          ] = input

          numbers = numbers.match(
            new RegExp("\\d{1,2}", "g")
          )
          boards = boards.map(
            board => board.split("\n").map(
              line => line.match(
                new RegExp("\\d{1,2}", "g")
              )
            )
          )

          console.log(numbers)

          while(num = numbers.shift()) {
            boards = boards.map(
              board => board.map(
                line => line.filter(board_num => num !== board_num)
              )
            )

            const found = boards.find(board => {
              return board.find(line => line.length === 0)
            })

            if(found !== undefined) {
              return resolver(
                found.reduce(
                  (p1, c1) => p1 + c1.reduce(
                    (p2,c2) => parseInt(p2) + parseInt(c2),
                    0,
                  ),
                  0
                ) * num
              )
            }
          }

        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;
const { readInputFileToArray, input_logger, debug } = require('../../helper.js')

const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      const input_path = `./${year}/${day}/input${input_part}.txt`
      // const input_path = `./${year}/${day}/example${input_part}.txt`
      readInputFileToArray(input_path, "\n")
        .then(input => {
          input_logger(input)
          const matrix = input.map(l => l.split(""))

          const gammaBinary = matrix.map(
            arr => arr.map(i => parseInt(i))
          ).reduce(
            (p,c) => Array(p.length).fill(0).map((v,i) => v + p[i]+c[i]),
            Array(matrix[0].length).fill(0)
          ).map(i => i > matrix.length / 2 ? "1" : "0").join("")

          const epsilonValue = parseInt(
            gammaBinary.split("").map(bit => !!parseInt(bit) ? "0" : "1").join(""),
            2
          )
          const gammaValue = parseInt(gammaBinary, 2);
          return resolver(gammaValue * epsilonValue)
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;
const { readInputFileToArray, input_logger, debug } = require('../../helper.js')

const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      // const input_path = `./${year}/${day}/input${input_part}.txt`
      const input_path = `./${year}/${day}/example${input_part}.txt`
      readInputFileToArray(input_path, "\n")
        .then(input => {
          input_logger(input)
          var matrix = input.map(
            l => l.split("").map(
              i => parseInt(i)
            )
          )

          const determine = (data, results) => data.reduce(
            (p,c) => Array(p.length).fill(0).map((v,i) => v + p[i]+c[i]),
            Array(matrix[0].length).fill(0)
          ).map(i => i >= matrix.length / 2 ? results[0] : results[1])


          for(var index = 0;index<matrix[0].length;index++) {
            const gammaBinaryItems = determine(matrix)
            matrix = matrix.filter( item => item[index] === gammaBinaryItems[index] )
          }
          const oxygenGeneratorRating = parseInt(
            matrix[0].map(bit => !!parseInt(bit) ? "0" : "1").join(""),
            2
          )
          console.log(matrix[0], oxygenGeneratorRating)
          const co2scrubberRating = 1;
          return resolver(oxygenGeneratorRating * co2scrubberRating)
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;
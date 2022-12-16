const { readInputFileToArray, input_logger, debug } = require('../../helper.js')

const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      const input_path = `./${year}/${day}/input${input_part}.txt`
      // const input_path = `./${year}/${day}/example${input_part}.txt`
      readInputFileToArray(input_path, "\n", "string")
        .then(input => {
          input_logger(input)

          const config = {
            "forward": [0, (c,n) => c + n],
            "up": [1, (c,n) => c - n],
            "down": [1, (c,n) => c + n]
          }
          const results = [0, 0]

          while(command = input.shift()) {
            var [
              what,
              num
            ] = command.split(" ")

            num = parseInt(num)

            const [
              resultIndex,
              resultCallback
            ] = config[what]

            results[resultIndex] = resultCallback(
              results[resultIndex],
              num
            )
          }


          return resolver(results.reduce((c, n) => c * n))
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;
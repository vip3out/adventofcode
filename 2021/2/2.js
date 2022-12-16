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
            "down": [
              [2, (r, n) => r[2] + n]
            ],
            "up": [
              [2, (r, n) => r[2] - n]
            ],
            "forward": [
              [0, (r, n) => r[0] + n],
              [1, (r, n) => r[1] + r[2] * n]
            ]
          }

          const results = [0, 0, 0]

          while(command = input.shift()) {
            var [
              what,
              num
            ] = command.split(" ")

            num = parseInt(num)
            var commands = Array.from(config[what])
            while(callbackData = commands.shift()) {
              const [
                resultIndex,
                resultCallback
              ] = callbackData
              results[resultIndex] = resultCallback(
                results,
                num
              )
            }


          }


          return resolver(results[0] * results[1])
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;
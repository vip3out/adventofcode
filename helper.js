const fs = require('fs');

const readInputFile =  (path) => {
  return new Promise(res => {
      fs.readFile(path, (err, data) => {
        if(err) {
          throw err
        }

        return res(data.toString())
      })
  }, rej => {
    rej("FAIL")
  })
}

const readInputFileToArray = (path, by, to) => {
  by = by || "\n"
  to = to || "string"

  return new Promise(res => {
    return readInputFile(path)
      .then(input => {
        let inputArray = input.split(by)
        const result = to === "int"
          ? inputArray.map(entry => parseInt(entry))
          : to === "float"
            ? inputArray.map(entry => parseFloat(entry))
            : inputArray
          return res(result)
      })
      .catch(error => {
        throw error
      })
  }, rej => {
    rej("FAIL")
  })
}

const input_logger = input => console.log(`\n`.bgGray + `\n\n` + `INPUT: \n\n${input}`.dim + `\n` + `\n`.bgGray + `\n`);
const debug = (args) => console.log(...args) 
module.exports.readInputFile = readInputFile
module.exports.readInputFileToArray = readInputFileToArray
module.exports.input_logger = input_logger
module.exports.debug = debug
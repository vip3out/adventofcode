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

module.exports.readInputFile = readInputFile
module.exports.readInputFileToArray = readInputFileToArray
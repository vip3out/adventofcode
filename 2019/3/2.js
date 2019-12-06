const { readInputFileToArray } = require('../../helper.js')
const { Line } = require('./Line.js')
const { Point } = require('./Point.js')

const start = new Point(0,0)

const programm = () => {
    return new Promise(resolver => {
      readInputFileToArray('./2019/3/input1.txt', "\n")
        .then(input => {
          console.log(`\n`.bgGray + `\n\n` + `INPUT: \n\n${input}`.dim + `\n` + `\n`.bgGray + `\n`);
          const linePathInstructions = input.map(line => line.split(","))

          const line1 = new Line(linePathInstructions[0], start)
          const line2 = new Line(linePathInstructions[1], start)

          const intersectionSteps = line1.intersectionSteps(line2).sort((a, b) => {
            return a - b
          })

          return resolver(intersectionSteps[0])
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;
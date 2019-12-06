const { readInputFileToArray } = require('../../helper.js')
const Line = require('./Line.js')
const Point = require('./Point.js')

const start = new Point(0,0)

const drawLine = (introductions) => {
  const line = new Line()
  let lastPoint = start.coords

  while(introduction = introductions. shift()) {
    let [currentX, currentY] = lastPoint

    let [direction,...value] = introduction.split("")
    value = parseInt(value.join(""))

    for(let i = 0;i<value;i++) {
      switch(direction) {
        case "R":
          currentX++
          break;

        case "L":
          currentX--
          break;

        case "U":
          currentY++
          break;

        case "D":
          currentY--
          break;
      }

      line.addPoint(new Point(currentX, currentY), step)
    }

    lastPoint = [currentX, currentY]
  }
  return line
}

const programm = () => {
    return new Promise(resolver => {
      readInputFileToArray('./2019/3/input1.txt', "\n")
        .then(input => {
          console.log(`\n`.bgGray + `\n\n` + `INPUT: \n\n${input}`.dim + `\n` + `\n`.bgGray + `\n`);
          const linePathInstructions = input.map(line => line.split(","))

          const line1 = drawLine(linePathInstructions[0])
          const line2 = drawLine(linePathInstructions[1])
          console.log({
            line1: line1.points,
            line2: line2.points,
            intersections: line1.intersections(line2)
          })
          const intersections = line1.intersections(line2).sort((a, b) => {
            return start.between(a) - start.between(b)
          })

          console.log({intersections})

          return resolver(start.between(intersections[0]))
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;
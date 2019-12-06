
const { Point } = require('./Point.js')
class Line {
  constructor(instructions, start) {
    this._points = []
    this._steps = []
    this._start = start

    this.draw(instructions)
  }

  get points() {
    return this._points
  }

  get steps() {
    return this._steps
  }

  draw(instructions) {
    let lastPoint = this._start.coords

    for(let o = 0;o<instructions.length;o++) {
      const instruction = instructions[o]
      let [currentX, currentY] = lastPoint

      let [direction,...value] = instruction.split("")
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

        this.addPoint(new Point(currentX, currentY))
      }

      lastPoint = [currentX, currentY]
    }
  }

  addPoint(point, step) {
    this._points.push(point)
    this._steps.push(step)
  }

  hasPoint(point) {
    let checkpoints = this.points
    for(let i = 0;i<checkpoints.length;i++) {
      if (checkpoints[i].equals(point)) {
        return i
      }
    }

    return false
  }

  intersections(line) {
    let intersections = []
    let checkpoints = line.points

    for(let i = 0;i<checkpoints.length;i++) {
      const point = checkpoints[i]
      if(this.hasPoint(point) && point != start) {
        intersections.push(point)
      }
    }

    return intersections
  }

  intersections(line) {
    let intersections = []
    let checkpoints = line.points

    for(let i = 0;i<checkpoints.length;i++) {
      const point = checkpoints[i]
      if(this.hasPoint(point) && point != this._start) {
        intersections.push(point)
      }
    }

    return intersections
  }

  intersectionSteps(line) {
    let intersectionSteps = []
    let checkpoints = line.points

    for(let i = 0;i<checkpoints.length;i++) {
      const point = checkpoints[i]
      const pointIndex = this.hasPoint(point)
      if(pointIndex !== false && point != this._start) {
        const steps = [pointIndex + 1, i + 1].reduce((p,c) => p+c, 0)
        intersectionSteps.push(steps)
      }
    }

    return intersectionSteps
  }
}

module.exports.Line = Line
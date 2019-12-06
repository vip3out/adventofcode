class Line {
  constructor() {
    this._points = []
    this._steps = []
  }

  get points() {
    return this._points
  }

  get steps() {
    return this._steps
  }

  addPoint(point, step) {
    this._points.push(point)
    this._steps.push(step)
  }

  hasPoint(point) {
    let checkpoints = this.points
    for(let i = 0;i<checkpoints.length;i++) {
      if (checkpoints[i].equals(point)) {
        return true
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
}

module.exports.Line = Line
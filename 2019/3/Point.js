class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  get coords () {
    return [ this.x, this.y ]
  }

  equals(point) {
    return this.x === point.x && this.y === point.y
  }

  between(point) {
    const a = this.x > point.x
      ? this.x - point.x
      : point.x - this.x

    const b = this.y > point.y
    ? this.y - point.y
    : point.y - this.y

    return a + b
  }
}

module.exports.Point = Point
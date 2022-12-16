
const { floor } = Math
const getDiff = (y,x) => y - x
const getHalf = x => floor(x/2)
const calc = (x,y,z) => [
  z * (z + getHalf(getDiff(y,x))) + x,
  getHalf(getDiff(y,x)) * (z + 1) + z + x
]

const getSeatId = (r,c,f) => r * f + c
const getInstructionPart = (str,x,y) => str.slice(x,y).split("")

const config = {
  row: {
    B: 1,
    F: 0,
    length: 7,
    start: 0,
    stop: 127
  },
  col: {
    R: 1,
    L: 0,
    length: 3,
    stop: 7,
    start: 0
  },
  faktor: 8,
}

const getSeatIds = (input, conf) => input.map(
  instruction => getSeatId(
    getInstructionPart(
      instruction, 0, conf.row.length
    ).reduce(
      (prev, curr) => calc(prev[0], prev[1], conf.row[curr]), 
      [conf.row.start, conf.row.stop]
    )[1],
    
    getInstructionPart(
      instruction, conf.row.length, conf.row.length + conf.col.length
    ).reduce(
      (prev, curr) => calc(prev[0], prev[1], conf.col[curr]), 
      [conf.col.start, conf.col.stop]
    )[1],
    conf.faktor
  ) 
)

module.exports.getSeatIds = getSeatIds
module.exports.config = config
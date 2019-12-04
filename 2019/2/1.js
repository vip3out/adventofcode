const { readInputFileToArray } = require('../../helper.js')

const getOpcode = (input, step) => {
  return input.reduce( (pre, curr, currIndex ) => {
    const lastOpcodeValues = pre[pre.length-1] || []
    const lastOpcodeValue = lastOpcodeValues[lastOpcodeValues.length-1] || 0
    let values = pre
    if(lastOpcodeValues.length % 4 === 0 || (curr === 99 && lastOpcodeValues.length === 0) || (lastOpcodeValues.length === 1 && lastOpcodeValue === 99)) {
        values.push([curr])
    } else {
        values[values.length-1].push(curr)
    }
    return values
  }, []).filter(
    (opcode, index) => index === step
  )[0]
}

const runOpcodes = (input, verb, noun) => {
  let mem = input.slice()
  mem[1] = verb
  mem[2] = noun

  let currentStep = 0
  let [op, ...positions] = getOpcode(mem, currentStep);

  while(op !== 99) {
    let [pos1, pos2, pos3] = positions

    switch(op) {
      case 1:
        mem[pos3] = mem[pos1] + mem[pos2]
        break;
      case 2:
        mem[pos3] = mem[pos1] * mem[pos2]
        break;
      default:
        break;
    }

    currentStep++
    [op, ...positions] = getOpcode(mem, currentStep)
  }

  return mem[0]
}

const programm = () => {
    return new Promise(resolver => {
      readInputFileToArray('./2019/2/input1.txt', ",", 'int')
        .then(input => {
          return resolver(
            runOpcodes(input, 12, 2)
          )
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;
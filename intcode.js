class IntcodeProgramm {
  constructor (input) {
    this.input = input
    this.step = 0
    this.opcodes = input
    this.gettingIndex = 0
  }

  get one () {
    return this.all.filter( ( opcode, index ) => index === this.step )[0]
  }

  get all () {
    return this.opcodes.reduce( (pre, curr ) => {
      const lastOpcodeValues = pre[pre.length-1] || []
      const lastOpcodeValue = lastOpcodeValues[lastOpcodeValues.length-1] || 0
      let values = pre
      if(lastOpcodeValues.length % 4 === 0 || (curr === 99 && lastOpcodeValues.length === 0) || (lastOpcodeValues.length === 1 && lastOpcodeValue === 99)) {
          values.push([curr])
      } else {
          values[values.length-1].push(curr)
      }
      return values
    }, [])
  }

  run(verb, noun) {
    let mem = this.opcodes.slice()
    mem[1] = verb
    mem[2] = noun

    let [op, ...positions] = this.one;

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

      this.step++
      [op, ...positions] = this.one
    }

    this.opcodes = mem
  }

  get value () {
    return this.opcodes[this.gettingIndex]
  }
}

module.exports.IntcodeProgramm = IntcodeProgramm
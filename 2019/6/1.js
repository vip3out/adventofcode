const { readInputFileToArray } = require('../../helper.js')

const mergeOrbit = function(key) {
  if(!this.orbits[key]) {
    return key
  }

  let newOrbit = {}
  newOrbit[key] = this.orbits[key].map(mergeOrbit.bind({
    orbits: this.orbits
  }))
  return newOrbit
}

const countOrbit = function(a, v, i, all) {
  console.log(v)
  console.log(v[Object.keys(v)[0]])
  const counting =  a + v[Object.keys(v)[0]].length
  if( typeof v === 'object' && !Array.isArray(v)) {
    return v[Object.keys(v)[0]].reduce(countOrbit, counting)
  }
  return counting
}

const programm = () => {
    return new Promise(resolver => {
      readInputFileToArray('./2019/6/input1.txt', "\n")
        .then(input => {
          console.log(`\n`.bgGray + `\n\n` + `INPUT: \n\n${input}`.dim + `\n` + `\n`.bgGray + `\n`);

          let orbits = {}
          for(let i = 0;i<input.length; i++) {
            let [objA,objB] = input[i].split(")")
            console.log(objA, objB, orbits[objA])
            if(orbits[objA]) {
              orbits[objA].push(objB)
            } else {
              orbits[objA] = [objB]

            }
          }

          console.log(orbits)
          let mergeOrbits = {}
          Object.keys(orbits).reverse().forEach(orbit => {
            mergeOrbits[orbit] = orbits[orbit].map(mergeOrbit.bind({
              orbits: orbits
            }))
          })



          // console.log(mergeOrbits['COM'][0]['B'][0]['C'])

          console.log(mergeOrbits[Object.keys(orbits)[0]].reduce(countOrbit, 0))


          return resolver(orbits)
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;
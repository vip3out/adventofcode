const { readInputFileToArray, input_logger } = require('../../helper.js')

const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      const input_path = `./${year}/${day}/input${input_part}.txt`
      // const input_path = `./${year}/${day}/test.txt`
      readInputFileToArray(input_path, "\n")
        .then(rules => {
          // find bags
          rules = rules.map(
            rule => new RegExp(
              "(.*) bags contain (?:(no other bag|.* (?:bags?)))"
            ).exec(rule)
          )
          // examine bags
          .map(
            rule => {
              return {
                color: rule[1],
                contains: rule[2].split(", ").map(bag => {
                  const match = new RegExp(
                    "^no other bag|(^\\d+) (.*) (?:bag|bags)"
                  ).exec(bag)
                  if(match[0] === 'no other bag') {
                    return null
                  }
                  return {
                    color: match[2],
                    count: parseInt(match[1])
                  }
                }).filter(child => child)
              }
            }
          )
          // flatten bags based on instruction of puzzle #2
          .map(bag => [
            bag.color,
            bag
          ])
          rules = Object.fromEntries(rules)
          const start = 'shiny gold'

          const reducer = (bag, bags, level) => {
            return bag.count + bag.count * bags[bag.color].contains.reduce(
              (prev, curr) => {
                if(bags.hasOwnProperty(curr.color) && bags[curr.color].contains.length > 0) {
                  return prev + reducer(curr, bags, level + 1)
                }
                return prev + curr.count
              },
              0
            )
          }

          return resolver(
            rules[start].contains.reduce(
              (prev, bag) => prev + reducer(bag, rules, 0), 0
            )
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

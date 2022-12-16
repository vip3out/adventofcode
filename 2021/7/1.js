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
                    count: match[1]
                  }
                })
              }
            }
          )
          // flatten bags based on instruction of puzzle #1
          .map(bag => [
            bag.color,
            bag.contains
              .filter(bag => bag)
              .map(cbag => cbag.color)
          ])
          
          // filter bags based on instruction of puzzle #1
          const directbag_colors = ['shiny gold']
          var founded = []
          while(bag_color = directbag_colors.shift()) {
            rules.forEach(bag => {
              if(bag[1].includes(bag_color)) {
                directbag_colors.push(bag[0])
                founded = [...new Set([...founded, ...[bag[0]]])]
              }
            })
          }
          return resolver(
            founded.length
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

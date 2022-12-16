const { readInputFileToArray, input_logger, debug } = require('../../helper.js')
const { build_objects, valid_objects_by_fields } = require('./helper')
const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      // const input_path = `./${year}/${day}/input${input_part}.txt`
      const input_path = `./${year}/${day}/example${input_part}.txt`
      const validateOptions = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"]
      readInputFileToArray(input_path, "\n\n")
        .then(input => {
          input_logger(input)
          var [
            numbers,
            ...boardsData
          ] = input

          numbers = numbers.match(
            new RegExp("\\d{1,2}", "g")
          ).map(v => parseInt(v))

          class BoardCollection {
            #winning_boards
            #boards
            constructor(items) {
              this.#boards = items.map(boardData => new Board(boardData))
              this.#winning_boards = []
            }

            get first_winning_board() {
              if(this.#winning_boards.length === 0) {
                return false
              }
              return this.#winning_boards[0]
            }

            get last_winning_board() {
              if(this.#winning_boards.length === 0) {
                return false
              }
              return this.#winning_boards.reverse[0]
            }

            get winning_boards() {
              return this.#winning_boards
            }

            through(nums = []) {
              while(n = nums.shift()) {
                this.#boards.forEach((board, bi) => {
                  board.mark(n)
                  if(board.check()) {
                    this.#winning_boards.push(board)
                  }
                })
              }
            }
          }

          class Board {
            #items
            #marked
            constructor(data) {
              this.#items = data.split("\n").map(
                line => line.match(
                  new RegExp("\\d{1,2}", "g")
                ).map(i => parseInt(i))
              )

              this.#marked = this.#items.map(
                item => Array(item.length).fill(0)
              )
            }

            createColsFrom(items) {
              return items.map(
                (item, index, arr) => Array(item.length).fill(0).map((v,i) => arr[i][index])
              )
            }

            get rows() {
              return this.#items
            }

            get cols() {
              return this.createColsFrom(this.#items)
            }

            get markedRows() {
              return this.#marked
            }

            get markedCols() {
              return this.createColsFrom(this.#marked)
            }

            get count_unmarked() {
              return this.#items.reduce( (prev, current, ri) => {
                return this.#items[ri].reduce(
                  (p, c, i) => !!this.#marked[ri][i] ? p + c : p
                )
              })
            }

            check() {
              if(!!this.markedCols.find(col => col.reduce((a,c) => a + c) === col.length)) {
                return true
              }

              return !!this.markedCols.find(row => row.reduce((a,c) => a + c) === row.length)
            }

            mark(number) {
              this.#items.forEach( (row, ri) => {
                row.forEach( (num, i) => {
                  this.#marked[ri][i] = num === number
                    ? 1
                    : 0
                })
              });
            }
          }

          const boards = new BoardCollection(boardsData)
          boards.through(numbers)
          console.log(boards.first_winning_board)
          return resolver("1")
          const founds = []
          while(num = numbers.shift()) {
            boards = boards.map(
              board => board.map(
                line => line.filter(board_num => num !== board_num)
              )
            )

            const found = boards.findIndex(board => {
              return board.find(line => line.length === 0)
            })

            if(found >= 0) {
              founds.push({
                'num': num,
                'boardIndex': found,
                'board': boards[found]
              })
            }
          }
          console.log(founds)
          return resolver(
            founds.reverse()[0].reduce(
              (p1, c1) => p1 + c1.reduce(
                (p2,c2) => parseInt(p2) + parseInt(c2),
                0,
              ),
              0
            ) * num
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
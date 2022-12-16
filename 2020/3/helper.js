const count_trees = (biom, right, down) => {
  var rowIndex = down
  var columnIndex = 0;
  var trees = 0;
  while(rowIndex < biom.length) {
    columnIndex += right
    if(columnIndex >= biom[rowIndex].length) {
    columnIndex = columnIndex - biom[rowIndex].length
    }
    if(biom[rowIndex][columnIndex] === "#") {
    trees++
    }
    rowIndex += down;
  }

  return trees
}

module.exports.count_trees = count_trees

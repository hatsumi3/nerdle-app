

/** cellの状態一覧 */
const cellStates = {
    notVerified: "NOT_VERIFIED",
    notIncluded: "NOT_INCLUDED",
    included: "INCLUDED",
    correct: "CORRECT"
}

/**
 * nerdle factory.
 * nerdle.gird: row * columnの2次元配列.cellにはvalue,stateを持つオブジェクト.
 * nerdle.grid.value: 数値、記号.
 * nerdle.grid.state: cellStatesのいずれか.
 * nerdle.setvalue: gridへのsetter.
 * 
 * @param {number} row
 * @param {number} column
 * @return {object} nerdle object
 */
const createNerdle = (row, column) => {

    const nerdle = {
        rowSize: row,
        columnSize: column,
        grid: [...Array(row)].map((_) => Array(column).fill({
            value: "",
            state: cellStates.notVerified
        })),
        setValue: function (cell, value) {
            if (!(cell.row >= 0 && cell.row < this.rowSize)) return;
            if (!(cell.column >= 0 && cell.column < this.columnSize)) return;
            this.grid[cell.row][cell.column] = { ...this.grid[cell.row][cell.column], value: value };
        },
    }
    return nerdle
}

export { cellStates, createNerdle }
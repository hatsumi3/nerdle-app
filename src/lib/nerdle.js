
import { cellStates, formulaStates, gameStates } from "./const";

const createProblem = (column, mode = {}) => {
    // TODO: column, modeによって変更できるようにする
    const candidate =
        ["12+35=47", "89-76=13", "1*2*3=6", "9/3+2=5", "22+22=44"]
    return candidate[Math.floor(Math.random() * candidate.length)]
}

/**
 * nerdle factory.
 * 
 * nerdle.gird: row * columnの2次元配列.cellにはvalue,stateを持つオブジェクト.
 * nerdle.grid.value: 数値、記号.
 * nerdle.grid.state: cellStatesのいずれか.
 * nerdle.setvalue: gridへのsetter. cell.row, cell.columnへvalueを挿入.
 * 
 * @param {number} row
 * @param {number} column
 * @param {object} mode
 * @return {object} nerdle object
 */
const createNerdle = (row, column, mode = {}) => {

    const nerdle = {
        rowSize: row,
        columnSize: column,
        grid: [...Array(row)].map((_) => Array(column).fill({
            value: "",
            state: cellStates.notVerified
        })),
        gridSummary: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '='].map((val) => {
            return {
                value: val,
                state: cellStates.notVerified
            }
        }),
        setValue: function (cell, value) {
            if (!(cell.row >= 0 && cell.row < this.rowSize)) return;
            if (!(cell.column >= 0 && cell.column < this.columnSize)) return;
            this.grid[cell.row][cell.column] = { ...this.grid[cell.row][cell.column], value };
        },
        problem: createProblem(column, mode),
        gameState: gameStates.continue,
        verify: function (row) {
            let formula = ""
            for (let j = 0; j < this.columnSize; j++) {
                formula += this.grid[row][j].value + "";
            }
            // const result = this.api.verify(formula)
            return this.checkGameState(row)
        },
        checkGameState: function (row) {
            // return gameStates.failed
            // return gameStates.continue
            // return gameStates.success;
            return formulaStates.error;
        },
    }
    console.log(nerdle)
    return nerdle
}

export { createNerdle }
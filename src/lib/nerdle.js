
import { cellStates, formulaStates, gameStates } from "./const";

const createProblem = (column, mode = {}) => {
    // TODO: column, modeによって,問題の候補を変更できるようにする
    const candidate =
        ["12+32=44", "12+35=47", "89-76=13", "1*3*8=24", "9/3+8=11"]
    return candidate[Math.floor(Math.random() * candidate.length)]
}

const createCountStrObject = (str) => {
    let retObj = {}
    for (let i = 0; i < str.length; i++) {
        if (str[i] in retObj) retObj[str[i]] += 1;
        else retObj[str[i]] = 1;
    }
    return retObj
}

/**
 * nerdle factory.
 * 
 * nerdle.gird: row * columnの2次元配列.cellにはvalue,stateを持つオブジェクト.
 * nerdle.grid.value: 数値、記号.
 * nerdle.grid.state: cellStatesのいずれか.
 * nerdle.setValue: gridへのsetter. cell.row, cell.columnへvalueを挿入.
 * nerdle.setState: gridへのsetter. cell.row, cell.columnへstateを挿入.
 * nerdle.problem: 問題文字列.
 * nerdle.gameState: ゲーム状態.
 * nerdle.verify: 数式、ゲーム状態の検証.
 * nerdle.verifyGameState: 数式の検証.
 * nerdle.verifyformulaState: ゲーム状態の検証.
 * 
 * @param {number} row
 * @param {number} column
 * @param {object} mode
 * @return {object} nerdle object
 */
const createNerdle = (row, column, mode = {}) => {

    const problem = createProblem(column, mode);
    const problemCountStr = createCountStrObject(problem);

    const nerdle = {
        rowSize: row,
        columnSize: column,
        grid: [...Array(row)].map((_) => Array(column).fill({
            value: "",
            state: cellStates.notVerified
        })),
        gridSummary: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '='].reduce((acc, cur) => ({ ...acc, [cur]: cellStates.notVerified }), {}),
        setValue: function (cell, value) {
            if (!(cell.row >= 0 && cell.row < this.rowSize)) return;
            if (!(cell.column >= 0 && cell.column < this.columnSize)) return;
            this.grid[cell.row][cell.column] = { ...this.grid[cell.row][cell.column], value };
        },
        setState: function (cell, state) {
            if (!(cell.row >= 0 && cell.row < this.rowSize)) return;
            if (!(cell.column >= 0 && cell.column < this.columnSize)) return;
            this.grid[cell.row][cell.column] = { ...this.grid[cell.row][cell.column], state };
        },
        updateSummaryState: function (key, state) {
            const currentState = this.gridSummary[key]
            if (currentState === cellStates.correct || currentState === cellStates.notIncluded) return;
            this.gridSummary[key] = state;
        },
        problem,
        problemCountStr,
        gameState: gameStates.continue,
        verify: function (row) {
            let formula = ""
            for (let j = 0; j < this.columnSize; j++) {
                formula += this.grid[row][j].value + "";
            }
            const formulaState = this.verifyFormulaState(formula)
            if (formulaState === formulaStates.error) return formulaState
            const gameState = this.verifyGameState(row, formula)
            return gameState
        },
        verifyGameState: function (row, formula) {
            // 1. 1文字づつ比較,grid,gridSummary更新.
            for (let j = 0; j < this.columnSize; j++) {
                let index = this.problem.indexOf(formula[j]);
                // 含まれない場合.
                if (index === -1) {
                    this.setState({ row, column: j }, cellStates.notIncluded);
                    this.updateSummaryState(formula[j], cellStates.notIncluded)
                    continue;
                }
                // 正しい場合.
                if (this.problem[j] === formula[j]) {
                    this.setState({ row, column: j }, cellStates.correct)
                    this.updateSummaryState(formula[j], cellStates.correct)
                    continue;
                }
                // 含まれる場合.
                this.setState({ row, column: j }, cellStates.included)
                this.updateSummaryState(formula[j], cellStates.included)
            }

            // 2. 複数文字対応(文字数に応じてgridのstateを変更), grid更新
            const rowCountStr = createCountStrObject(formula)
            for (const [key, count] of Object.entries(rowCountStr)) {
                // 2文字以上含まれる場合
                // 問題に文字が含まれるかを確認
                if (count <= 1) continue;
                if (!(key in this.problemCountStr)) continue;
                // 文字数が問題の文字数以下か確認
                let problemKeyCount = this.problemCountStr[key]
                if (count <= problemKeyCount) continue;
                // 文字数が合うまで,stateの変更を行う
                let changeCount = count - problemKeyCount;
                console.log(key, changeCount)
                for (let j = 0; j < this.columnSize; j++) {
                    if (this.grid[row][j].value != key) continue;
                    if (this.grid[row][j].state === cellStates.correct) continue;
                    this.setState({ row, column: j }, cellStates.notIncluded)
                    changeCount -= 1;
                    if (changeCount <= 0) break;
                }
            }

            // 3. ゲーム状態判定
            let isClear = true
            for (let j = 0; j < this.columnSize; j++) {
                if (this.grid[row][j].state !== cellStates.correct) {
                    isClear = false;
                    break;
                }
            }
            if (isClear) {
                this.gameState = gameStates.success;
            } else if (row === this.rowSize - 1) {
                this.gameState = gameStates.failed;
            } else {
                this.gameState = gameStates.continue;
            }
            return this.gameState
        },
        verifyFormulaState: function (formula) {
            // 1. =が1つのみ
            const formulaArray = formula.split('=')
            if (formulaArray.length !== 2) return formulaStates.error;

            // 2. 右辺が数値(記号が含まれない)
            const regexNum = /^[1-9][0-9]*$/
            if (!regexNum.test(formulaArray[1])) return formulaStates.error;

            // 3. 左辺に記号が連続しない、かつ記号の間は数値である
            const regexSign = /\+|-|\*|\//
            const leftFormula = formulaArray[0].split(regexSign)
            if (leftFormula.includes("")) return formulaStates.error
            for (let num of leftFormula) {
                if (!regexNum.test(num)) return formulaStates.error;
            }

            // 4. 統合が成立
            const leftResult = Function('return (' + formulaArray[0] + ');')();
            const rightResult = Number(formulaArray[1])
            if (leftResult !== rightResult) return formulaStates.error
            return formulaStates.success
        }
    }
    console.log(nerdle)
    return nerdle
}

export { createNerdle }
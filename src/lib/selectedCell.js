


/**
 * selectedCell factory.
 * 
 */
const createSelectedCell = (ROW, COLUMN) => {

    // セルの座標、選択セルの移動・無効化
    const selectedCell = {
        row: 0,
        column: 0,
        moveNextRow: function () {
            if (this.row >= 0 && this.row < ROW - 1) {
                this.row += 1;
                this.column = 0;
            }
        },
        moveRight: function () {
            if (this.column >= 0 && this.column < COLUMN - 1) {
                this.column += 1;
            }
        },
        moveLeft: function () {
            if (this.column > 0) {
                this.column -= 1;
            }
        },
        fixed: function () {
            this.row = -1;
            this.column = -1;
        }
    }
    return selectedCell

}


export { createSelectedCell }
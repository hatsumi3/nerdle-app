<script>
  import { createNerdle } from "./nerdle.js";
  import { gameStates, formulaStates } from "./const";
  import { nerdleAlertUtil } from "./nerdleAlertUtil.js";

  /** initialize */

  //.env
  const ROW = parseInt(import.meta.env.VITE_NERDLE_ROW) || 6;
  const COLUMN = parseInt(import.meta.env.VITE_NERDLE_COLUMN) || 8;

  // nerdle instance
  let nerdle = createNerdle(ROW, COLUMN);

  // 選択セル(黒枠)

  let selectedCell = {
    row: 0,
    column: 0,
  };

  // 選択セルの移動・無効化
  function moveNextRow() {
    if (selectedCell.row >= 0 && selectedCell.row < ROW - 1) {
      selectedCell.row += 1;
      selectedCell.column = 0;
    }
  }
  function moveRight() {
    if (selectedCell.column >= 0 && selectedCell.column < COLUMN - 1) {
      selectedCell.column += 1;
    }
  }
  function moveLeft() {
    if (selectedCell.column > 0) {
      selectedCell.column -= 1;
    }
  }
  function fixed() {
    selectedCell.row = -1;
    selectedCell.column = -1;
  }

  // mouse click(選択セル)
  function selected(event) {
    const elementName = event.target.getAttribute("name");
    // エラーハンドリング
    // 1文字以上の文字列の際に実行
    if (!elementName) return;
    // cell01のような属性かどうか
    if (!(elementName.startsWith("cell") && elementName.length === 6)) return;

    // cell01の後ろ2文字が行列番号.同じ行の場合のみ選択可能
    const currentRow = elementName.slice(-2, -1);
    if (currentRow == selectedCell.row) {
      selectedCell.column = parseInt(elementName.slice(-1));
    }
  }

  // key binding.
  function handleKeydown(event) {
    if (nerdle.gameState !== gameStates.continue) return;
    switch (event.key) {
      case "ArrowRight":
        moveRight();
        return;
      case "ArrowLeft":
        moveLeft();
        return;
      case "Enter":
        verify();
        return;
      case "Backspace":
      case "Delete":
        nerdleSetValue("");
        return;
      case "+":
      case "-":
      case "*":
      case "/":
      case "=":
        nerdleSetValue(event.key);
        moveRight();
        return;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        nerdleSetValue(parseInt(event.key));
        moveRight();
        return;
      default:
        return;
    }
  }

  // cellの値更新
  function nerdleSetValue(value) {
    nerdle.setValue(selectedCell, value);
    //リアクティビティが代入によってトリガー
    nerdle = nerdle;
  }

  // 判定
  function verify() {
    switch (nerdle.verify(selectedCell.row)) {
      case gameStates.success:
        nerdleAlertUtil.gameClear();
        fixed();
        break;
      case gameStates.continue:
        moveNextRow();
        break;
      case formulaStates.error:
        nerdleAlertUtil.formulaError();
        break;
      case gameStates.failed:
      default:
        nerdleAlertUtil.gameFailed(nerdle.problem);
        fixed();
        break;
    }
    //リアクティビティが代入によってトリガー
    nerdle = nerdle;
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="grid">
  {#each [...Array(ROW).keys()] as r, i}
    <div class="row" name="row{i}">
      {#each [...Array(COLUMN).keys()] as c, j}
        <div
          class="block {nerdle.grid[i][j].state} {selectedCell.row == i &&
          selectedCell.column == j
            ? 'selected'
            : ''} "
          role="navigation"
          name="cell{i}{j}"
          on:click={selected}
          on:keyup={() => {}}
        >
          {nerdle.grid[i][j].value}
        </div>
      {/each}
    </div>
  {/each}
</div>

<div>
  <div class="button-area">
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as number}
      <button
        aria-label={number + ""}
        class="input-button {nerdle.gridSummary[number]}"
        on:click={() => {
          nerdleSetValue(number);
          moveRight();
        }}>{number}</button
      >
    {/each}
  </div>
  <div class="button-area">
    {#each ["+", "-", "*", "/", "="] as sign}
      <button
        aria-label={sign}
        class="input-button {nerdle.gridSummary[sign]}"
        on:click={() => {
          nerdleSetValue(sign);
          moveRight();
        }}
        >{sign}
      </button>
    {/each}
    <button
      aria-label="Enter"
      class="input-button text"
      on:click={() => verify()}
    >
      <span class="text-base">Enter</span>
    </button>
    <button
      aria-label="Delete"
      class="input-button text"
      on:click={() => {
        nerdleSetValue("");
      }}
    >
      <span class="text-base">Delete</span>
    </button>
  </div>
</div>

<style>
  /* グリッド */
  .grid {
    padding-bottom: 1rem;
  }
  .row {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 0.25rem;
  }
  .block {
    border: 2px solid #989484;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.125rem;
    font-size: 1.125rem;
    font-weight: 700;
    color: white;
    height: 3.2rem;
    width: 3.5rem;
  }
  .block.selected {
    border-color: black;
  }
  .block.not-verified {
    background-color: #989484;
  }
  .block.not-included {
    color: #fff;
    border-color: rgb(22 24 3);
    background-color: rgb(22 24 3);
  }
  .block.included {
    color: #fff;
    border-color: rgb(130 4 88);
    background-color: rgb(130 4 88);
  }
  .block.correct {
    color: #fff;
    border-color: rgb(57 136 116);
    background-color: rgb(57 136 116);
  }

  /* 入力ボタンエリア */
  .button-area {
    display: flex;
    justify-content: center;
    margin-bottom: 0.25rem;
    user-select: none;
    flex-wrap: wrap;
  }
  .input-button {
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.125rem;
    font-weight: 700;
    height: 3.2rem;
    width: 40px;
    user-select: none;
    cursor: pointer;
    background-color: rgb(226 232 240);
  }
  .input-button.text {
    width: 65.4px;
  }
  .text-base {
    font-size: 1rem;
  }
  .input-button.not-verified {
    background-color: rgb(226 232 240);
  }
  .input-button.not-verified:hover {
    background-color: rgb(203 213 225);
  }
  .input-button.not-verified:active {
    background-color: rgb(148 163 184);
  }
  .input-button.not-included {
    color: #fff;
    border-color: rgb(22 24 3);
    background-color: rgb(22 24 3);
  }
  .input-button.included {
    color: #fff;
    border-color: rgb(130 4 88);
    background-color: rgb(130 4 88);
  }
  .input-button.correct {
    color: #fff;
    border-color: rgb(57 136 116);
    background-color: rgb(57 136 116);
  }
</style>

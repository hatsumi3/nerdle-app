<script>
  import { createNerdle } from "./nerdle.js";
  import { openAlertFor } from "../stores/AlertOpen.js";

  //TODO: 定数読込
  // 確認用:
  // $: console.log(
  //   import.meta.env.VITE_NERDLE_ROW,
  //   import.meta.env.VITE_NERDLE_COLUMN
  // );
  const ROW = 6;
  const COLUMN = 8;

  // nerdle object
  let nerdle = createNerdle(ROW, COLUMN);

  // 選択セル(黒枠)
  const selectedCell = {
    row: 0,
    column: 0,
  };

  // click
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

  // 選択セルの移動
  function moveNextRow() {
    if (selectedCell.row < ROW - 1) {
      selectedCell.row += 1;
      selectedCell.column = 0;
    }
  }
  function moveRight() {
    if (selectedCell.column < COLUMN - 1) {
      selectedCell.column += 1;
    }
  }
  function moveLeft() {
    if (selectedCell.column > 0) {
      selectedCell.column -= 1;
    }
  }

  function verify() {
    openAlertFor(2000);
    moveNextRow();
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
        class="input-button"
        on:click={() => {
          nerdleSetValue(number);
          moveRight();
        }}>{number}</button
      >
    {/each}
  </div>
  <div class="button-area">
    <button
      aria-label="+"
      class="input-button"
      on:click={() => {
        nerdleSetValue("+");
        moveRight();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        aria-label="plus"
        style="height: 1rem"
      >
        <title id="plustitle">plus</title>
        <path
          d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
        />
      </svg>
    </button>
    <button
      aria-label="-"
      class="input-button"
      on:click={() => {
        nerdleSetValue("-");
        moveRight();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        aria-label="minus"
        style="height: 1rem"
      >
        <title id="minustitle">minus</title>
        <path
          d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"
        />
      </svg>
    </button>
    <button
      aria-label="*"
      class="input-button"
      on:click={() => {
        nerdleSetValue("*");
        moveRight();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        aria-label="multipy"
        style="height: 1rem"
      >
        <title id="timestitle">multiply</title>
        <path
          d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z"
        />
      </svg>
    </button>
    <button
      aria-label="/"
      class="input-button"
      on:click={() => {
        nerdleSetValue("/");
        moveRight();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        aria-label="divide"
        style="height: 1rem; transform: rotate(90deg)"
      >
        <title id="divtitle">divide</title>
        <path
          d="M5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196V9.196z"
        />
      </svg>
    </button>
    <button
      aria-label="="
      class="input-button"
      on:click={() => {
        nerdleSetValue("=");
        moveRight();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        aria-label="equals"
        style="height: 1rem"
      >
        <title id="equalstitle">=</title>
        <path
          d="M48 192h352c17.69 0 32-14.32 32-32s-14.31-31.1-32-31.1h-352c-17.69 0-32 14.31-32 31.1S30.31 192 48 192zM400 320h-352c-17.69 0-32 14.31-32 31.1s14.31 32 32 32h352c17.69 0 32-14.32 32-32S417.7 320 400 320z"
        />
      </svg>
    </button>
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

<div>{selectedCell.row} - {selectedCell.column}</div>
<div>{typeof selectedCell.row} - {typeof selectedCell.column}</div>

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
    border-color: rgb(22 24 3);
    background-color: rgb(22 24 3);
  }
  .block.included {
    border-color: rgb(57 136 116);
    background-color: rgb(57 136 116);
  }
  .block.correct {
    border-color: rgb(130 4 88);
    background-color: rgb(130 4 88);
  }

  /* 入力ボタン */
  .button-area {
    display: flex;
    justify-content: center;
    margin-bottom: 0.25rem;
    user-select: none;
  }
  .input-button {
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.125rem;
    font-size: 1.125rem;
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
  .input-button:hover {
    background-color: rgb(203 213 225);
  }
  .input-button:active {
    background-color: rgb(148 163 184);
  }
  .text-base {
    font-size: 1rem;
  }
</style>

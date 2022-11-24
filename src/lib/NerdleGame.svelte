<script>
  export let width = 7;
  export let height = 6;

  $: widthArray = [...Array(width).keys()];
  $: heightArray = [...Array(height).keys()];

  let selectedBlock = 1;

  function selected(event) {
    const elementName = event.target.getAttribute("name");
    // 1文字以上の文字列
    if (!elementName) return;
    selectedBlock = elementName.slice(-1);
  }
</script>

<div class="grid">
  {#each heightArray as row, i}
    <div class="row" name="row{i}">
      {#each widthArray as block, j}
        <div
          class="block {selectedBlock == j ? 'selected' : ''}"
          role="navigation"
          name="block{j}"
          on:click={selected}
        >
          {block}
        </div>
      {/each}
    </div>
  {/each}
</div>

<div>
  <div class="button-area">
    {#each [...Array(10).keys()] as number}
      <button aria-label={number + 1 + ""} class="input-button">
        {number + 1}
      </button>
    {/each}
  </div>
  <div class="button-area">
    <button aria-label="+ " class="input-button">
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
    </button><button aria-label="minus " class="input-button">
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
      </svg></button
    ><button aria-label="* " class="input-button">
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
      </svg></button
    ><button aria-label="/ " class="input-button">
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
      </svg></button
    ><button aria-label="= " class="input-button">
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
      </svg></button
    ><button aria-label="ENTER " class="input-button text">
      <span class="text-base">Enter</span></button
    ><button aria-label="DELETE " class="input-button text">
      <span class="text-base">Delete</span>
    </button>
  </div>
</div>

<style>
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
    background-color: #989484;
  }
  .block.selected {
    border-color: black;
  }

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

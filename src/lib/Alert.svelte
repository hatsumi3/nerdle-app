<script>
  import { isAlertOpen } from "../stores/AlertOpen.js";
  let isClear = false;
</script>

{#if $isAlertOpen}
  <div class="alert {isClear ? 'clear' : ''}">
    {#if !isClear}
      <span>That guess doesn't compute! </span>
    {:else}
      <span>Congratulations! </span>
    {/if}
  </div>
{/if}

<style>
  .alert {
    position: absolute;
    font-size: 0.8rem;
    text-align: center;
    width: 300px;
    background-color: pink;
    border-radius: 0.25rem;
    left: 0;
    right: 0;
    margin: auto;
    padding: 0.5rem 0;
  }

  .alert.clear {
    background-color: #d4edda;
  }
</style>

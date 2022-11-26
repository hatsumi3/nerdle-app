<script>
  import { isAlertOpen, alertMessage, alertColor } from "../stores/Alert.js";
</script>

{#if $isAlertOpen}
  <div class="alert" style="background-color:{$alertColor};">
    {$alertMessage}
  </div>
{/if}

<style>
  .alert {
    position: absolute;
    font-size: 0.8rem;
    text-align: center;
    width: 300px;
    background-color: blue;
    border-radius: 0.25rem;
    left: 0;
    right: 0;
    margin: auto;
    padding: 0.5rem 0;
  }
</style>

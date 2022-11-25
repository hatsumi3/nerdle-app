<script>
  import Header from "./lib/Header.svelte";
  import NerdleGame from "./lib/NerdleGame.svelte";
</script>

<div class="container">
  <Header />
  <NerdleGame />
</div>

<style>
  .container {
    max-width: 100%;
    width: 450px;
    margin: 0 auto;
  }
</style>

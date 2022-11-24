<script>
  import Header from "./lib/Header.svelte";
  import NerdleGame from "./lib/NerdleGame.svelte";

  const xy = {
    width: 8,
    height: 6,
  };
</script>

<div class="container">
  <Header />
  <NerdleGame {...xy} />
</div>

<style>
  .container {
    max-width: 100%;
    width: 450px;
    margin: 0 auto;
  }
</style>

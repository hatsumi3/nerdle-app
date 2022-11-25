<script>
  import Header from "./lib/Header.svelte";
  import NerdleGame from "./lib/NerdleGame.svelte";
  import Alert from "./lib/Alert.svelte";
</script>

<div class="container">
  <Alert />
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

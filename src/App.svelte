<script>
  import Counter from "./lib/Counter.svelte";
  import Header from "./lib/Header.svelte";
</script>

<div class="container">
  <Header />
  <main>
    <Counter />
  </main>
</div>

<style>
  .container {
    max-width: 100%;
    width: 450px;
    margin: 0 auto;
  }
</style>

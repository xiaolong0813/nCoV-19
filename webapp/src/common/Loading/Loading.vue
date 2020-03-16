<template>
    <section>
      <div class="mock">
          <div class="main">Loading.....</div>
    </div>
    </section>
</template>

<script>
export default {
    name: 'Loading'

}
</script>

<style>
    section {
        width: 100vh;
        height: 100vh;
        position: relative;
    }
    .mock {
        width: 100vh;
        height: 100vh;
        position: absolute;
        z-index: 100;
        background-color: #abb2bf;
    }
    .main {
        /*position: absolute;*/
        /*top: 200px;*/
        /*left: 50%;*/
        margin: 200px auto;
        text-align: center;
    }

</style>

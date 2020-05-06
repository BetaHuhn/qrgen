<template>
    <div class="by">
        <p>Created by <a href="https://github.com/BetaHuhn">BetaHuhn</a></p>
    </div>
</template>

<script>
  export default {
    name: 'By',
  }
</script>

<style scope>
  .by{
    text-align: center;
    position: fixed;
    bottom: 20px;
    left: 2rem;
  }
  .by a{
    text-decoration: none;
    color: #60ddaf;
    font-weight: 600;
  }
</style>

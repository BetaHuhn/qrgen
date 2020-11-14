<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>

  export default {
    name: 'App',
    mounted () {
      window.scrollTo(0, 0)
    }
  }
</script>

<style>
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: #fff;
    background-color: #282d2d;
  }

  #app {
    height: 100%;
    background-color: #282d2d;
    position: relative;
  }
  main {
    height: 100%
  }

  .link {
    text-decoration: none;
    color: #60ddaf;
    font-weight: 600;
  }

  .logo {
    width: 40px;
    margin-bottom: -10px;
    margin-right: 10px;
  }

  .noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.2s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  @keyframes fadein {
    from {
      opacity: 0.2;
    }

    to {
      opacity: 1;
    }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadein {
    from {
      opacity: 0.2;
    }

    to {
      opacity: 1;
    }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
    from {
      opacity: 0.2;
    }

    to {
      opacity: 1;
    }
  }

  /* Internet Explorer */
  @-ms-keyframes fadein {
    from {
      opacity: 0.2;
    }

    to {
      opacity: 1;
    }
  }

  /* Opera < 12.1 */
  @-o-keyframes fadein {
    from {
      opacity: 0.2;
    }

    to {
      opacity: 1;
    }
  }
</style>
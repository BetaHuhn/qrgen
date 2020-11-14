<template>
    <div id="error">
        <div class="not-found-wrapper">
            <div class="branding noselect">
                <div class="wordmark"> <img src="/static/404.svg"></div>
            </div>
            <h2>Error 404</h2>
            <div style="text-align:center;margin-bottom:40px;">Either the short url doesn't exist or you are
                trying to use a url that is not valid
            </div>
            <div class="main-button">
                <button onclick="window.location.href='/'" class="clean"> ← Go back Home</button> 
            </div>
            <div> 
                <a class="link" target="_top" href="mailto:contact@mxis.ch">Report a problem</a> 
            </div>
        </div>
    </div>
</template>

<script scoped>
    export default {
        name: '404'
    }
</script>

<style scoped>
    .wordmark {
        padding-bottom: 10px;
        text-align: center;
        display: block;
        margin: auto;
    }

    .not-found-wrapper {
        margin: 0;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .branding {
        padding-bottom: 30px;
    }

    .main-button {
        text-align: center;
    }

    .clean {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-weight: 600;
        font-style: normal;
        width: 300px;
        text-transform: uppercase;
        font-size: 14px;
        line-height: 9px;
        letter-spacing: .6px;
        padding: 0 24px;
        height: 40px;
        border-radius: 40px;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        -webkit-transition: all .2s ease;
        -moz-transition: all .2s ease;
        -o-transition: all .2s ease;
        transition: all .2s ease;
        transition-property: all;
        background-color: #60ddaf;
        color: #fff;
        outline: 0;
        border: 0;
        -webkit-transition-property: opacity, background-color, -webkit-transform;
        -moz-transition-property: opacity, background-color, -webkit-transform;
        -o-transition-property: opacity, transform, background-color;
        transition-property: opacity, transform, background-color, -webkit-transform;
        cursor: pointer;
        margin-bottom: 20px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        user-select: none;
    }
</style>
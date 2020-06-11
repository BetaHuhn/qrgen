<template>
    <div id="error">
        <main>
            <div class="content">
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
                        <a class="link" target="_top" href="mailto:webmaster@mxis.ch">Report a problem</a> 
                    </div>
                </div>
            </div>
            <By />
        </main>
        <Footer />
    </div>
</template>

<script>
    import Footer from '@/components/Footer'
    import By from '@/components/By'

    export default {
        name: '404',
        components: {
            Footer,
            By
        }
    }
</script>

<style scoped>
    #error {
        height: 100%;
    }

    #error .content {
        width: 300px;
        margin: auto;
        text-align: center;
        position: absolute;
        top: 42%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-animation: fadein 1s;
        -moz-animation: fadein 1s;
        -ms-animation: fadein 1s;
        -o-animation: fadein 1s;
        animation: fadein 1s;
    }

    .description {
        margin: auto;
    }

    .description h1 {
        margin-bottom: 5px;
    }

    .description a {
        margin-bottom: 5px;
        text-decoration: none;
        color: #60ddaf;
        font-weight: 700;
    }

    .description p {
        margin-top: 5px;
        margin-bottom: 2.5rem;
    }

    .example {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 15;
        color: #25D084;
        text-align: center;
    }

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
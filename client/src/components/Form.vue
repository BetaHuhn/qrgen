<template>
    <div id="form">
        <div class="description noselect">
            <h1><a class="link bold" style="color: #fff" href="https://qrgen.cc">QrGen.cc</a></h1>
            <p>Generate a QR-Code and Short Url</p>
        </div>
        <div class="input-container noselect" :class="{ urlInvalidShake: inputInvalid }">
            <p class="input-label noselect">Enter a URL</p>
            <div class="center" data-children-count="1">
                <input id="url" class="url-input" :class="{ inputInvalid: inputInvalid }" v-model="url" autocomplete="off" style="width: 12px;">
            </div>
        </div>
        <div class="main-button">
            <button class="clean" @click="create">CREATE</button>
        </div>
        <p v-if="error" class="error">{{ errorMsg }}</p>
    </div>
</template>

<script>
    import validUrl from '@/utils/validUrl'
    import withHttp from '@/utils/withHttp'

    export default {
        name: 'Form',
        methods: {
            create: function () {
                const url = withHttp(this.url);
                if(validUrl(url)){
                    return this.$store.dispatch("createShort", url);
                }

                this.$store.commit("inputInvalid");
            }
        },
        computed:{
            url:{
                get: function(){ 
                    return this.$store.state.url; 
                }, 
                set: function(newUrl){ 
                    this.$store.dispatch('changeUrl', newUrl); 
                }
            },
            inputInvalid: function(){ 
                return this.$store.state.inputInvalid;
            },
            error: function(){ 
                return this.$store.state.error;
            },
            errorMsg: function(){ 
                return this.$store.state.errorMsg;
            }
        } 

    }
</script>

<style scoped>
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

    .error{
        color: #dd6060;
        font-weight: 600;
        margin: 0;
        position: absolute;
        left: 0;
        right: 0;
    }

    .form {
        margin: 1rem;
    }

    .form button {
        display: inline-block;
        background: #60ddaf;
        color: inherit;
        font: inherit;
        font-size: 16px;
        border: 0;
        outline: 0;
        padding: 0;
        cursor: pointer;
        color: #fff;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
        border-radius: 40px;
        padding: 12px 36px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin-top: 1rem;
    }

    .url-input {
        height: 47px;
        font-size: 14px;
        padding: 2px 10px 0;
        outline: 0;
        background: #282d2d;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        box-sizing: border-box;
        border-radius: 4px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        letter-spacing: 0;
        color: #d7d7d7;
        font-weight: 200;
        font-style: normal;
        border: 1px solid #A6A6A6;
        border-radius: 4;
        margin-bottom: 20px;
        width: 300px;
        min-width: 300px !important;
        max-width: 50% !important;
        transition: width 0.25s, border 0.25s;
    }

    .url-input:focus {
        border: 1px solid #60ddaf;
        color: #fff;
    }

    .inputInvalid {
        border: 1px solid #FF6175;
    }

    .input-container {
        position: relative;
    }

    .input-label {
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        margin: 3px auto;
        bottom: 53px;
        background-color: #282d2d;
        width: 140px;
        font-size: 13px;
        color: #A6A6A6;
        text-transform: uppercase;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    .center {
        text-align: center;
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

    .clean:hover {
        opacity: .8;
    }

    /* Validation Error Shake */
    .urlInvalidShake {
        animation: shake .5s linear;
        -o-animation: shake .5s linear;
        -ms-animation: shake .5s linear;
        -moz-animation: shake .5s linear;
        -webkit-animation: shake .5s linear;
    }

    @keyframes shake {

        8%,
        41% {
            transform: translateX(-10px);
        }

        25%,
        58% {
            transform: translateX(10px);
        }

        75% {
            transform: translateX(-5px);
        }

        92% {
            transform: translateX(5px);
        }

        0%,
        100% {
            transform: translateX(0);
        }
    }

    @-o-keyframes shake {

        8%,
        41% {
            -o-transform: translateX(-10px);
        }

        25%,
        58% {
            -o-transform: translateX(10px);
        }

        75% {
            -o-transform: translateX(-5px);
        }

        92% {
            -o-transform: translateX(5px);
        }

        0%,
        100% {
            -o-transform: translateX(0);
        }
    }

    @-ms-keyframes shake {

        8%,
        41% {
            -ms-transform: translateX(-10px);
        }

        25%,
        58% {
            -ms-transform: translateX(10px);
        }

        75% {
            -ms-transform: translateX(-5px);
        }

        92% {
            -ms-transform: translateX(5px);
        }

        0%,
        100% {
            -ms-transform: translateX(0);
        }
    }

    @-moz-keyframes shake {

        8%,
        41% {
            -moz-transform: translateX(-10px);
        }

        25%,
        58% {
            -moz-transform: translateX(10px);
        }

        75% {
            -moz-transform: translateX(-5px);
        }

        92% {
            -moz-transform: translateX(5px);
        }

        0%,
        100% {
            -moz-transform: translateX(0);
        }
    }

    @-webkit-keyframes shake {

        8%,
        41% {
            -webkit-transform: translateX(-10px);
        }

        25%,
        58% {
            -webkit-transform: translateX(10px);
        }

        75% {
            -webkit-transform: translateX(-5px);
        }

        92% {
            -webkit-transform: translateX(5px);
        }

        0%,
        100% {
            -webkit-transform: translateX(0);
        }
    }
</style>
<template>
    <div id="home">
        <main>
            <div class="content">
                <Result v-if="showResult" />
                <Form v-else />
            </div>
            <By />
        </main>
        <Footer />
    </div>
</template>

<script>
    import Result from '@/components/Result'
    import Form from '@/components/Form'
    import Footer from '@/components/Footer'
    import By from '@/components/By'

    export default {
        name: 'App',
        computed: {
            showResult: function () {
                return this.$store.state.showResult
            },
        },
        components: {
            Result,
            Form,
            Footer,
            By
        },
        beforeMount() {
            let {url, code} = this.$route.query
            if(url != undefined && code != undefined){
                this.$router.replace("/")
                this.$store.dispatch("showResult", {code, url})
            }
        },
    }
</script>

<style lang="scss">
    #home {
        height: 100%;
    }

    #home .content {
        width: 85%;
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
</style>
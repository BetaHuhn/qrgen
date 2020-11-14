<template>
    <div id="home">
        <main>
            <div class="content">
                <Result v-if="show === 'result'" />
                <Form v-if="show === 'form'" />
                <div v-if="show === 'redirect'">
                    <h1>Redirecting...</h1>
                </div>
                <div v-if="show === 'loading'">
                    <h1>Loading...</h1>
                </div>
                <NotFound v-if="show === 'notFound'" />
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
    import NotFound from '@/components/NotFound'
    import validUrl from '@/utils/validUrl'
    import withHttp from '@/utils/withHttp'

    export default {
        name: 'App',
        computed: {
            show: function () {
                return this.$store.state.show
            }
        },
        components: {
            Result,
            Form,
            Footer,
            By,
            NotFound
        },
        created: function () {
            if(this.$route.meta.checkPath === true){
                const route = this.$route.fullPath.substr(1);
                const url = withHttp(route);
                if(validUrl(url)){
                    return this.$store.dispatch("createShort", url);
                }

                this.$store.commit("display404")
            }
        },
    }
</script>

<style scoped>
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
<template>
        <NotFound v-if="show == 'notFound'" />
        <div v-else id="home">
            <main>
                <div class="content">
                    <Result v-if="show == 'result'" />
                    <Form v-if="show == 'normal'" />
                    <div v-if="show == 'redirect'">
                        <h1>Redirecting...</h1>
                    </div>
                    <div v-if="show == 'loading'">
                        <h1>Loading...</h1>
                    </div>
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
    import NotFound from '@/views/404'

    export default {
        name: 'App',
        computed: {
            show: function () {
                return this.$store.state.show
            }
        },
        methods: {
            validURL: function(value){
                const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
                const regexp = new RegExp(expression);
                return regexp.test(value);
            },
            withHttp: function(url){
                if(!url.startsWith("http") && !url.startsWith("file") && !url.startsWith("ftp")){
                    return "https://" + url;
                }
                return url
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
                const url = this.withHttp(route);
                if(this.validURL(url)){
                    this.$store.dispatch("retrieveAPIData", url);
                }else{
                    this.$store.dispatch("getFromCode", route);
                }
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
<template>
  <div id="result">
    <vue-qrcode
      class="qr"
      :value="url"
      :color="{dark: '#fff', light: '#0000'}"
      :width="500"
      :scale="1"
      :margin="0"
    />
    <div id="code">
      <h1>
        Your short link: <a
          id="short"
          class="link"
          :href="'https://qrgen.cc/' + code"
        >qrgen.cc/{{ code }}</a>
      </h1>
    </div>
    <div class="options noselect">
      <p
        id="copy"
        class="copy"
        @click="copy"
      >
        Copy URL
      </p>
      <p class="or">
        or
      </p>
      <p
        class="copy"
        @click="reset"
      >
        Create another one
      </p>
    </div>
  </div>
</template>

<script>
import VueQrcode from 'vue-qrcode'

export default {
	name: 'Result',
	components: {
		VueQrcode
	},
	computed: {
		code: function() {
			return this.$store.state.code
		},
		qr: function() {
			return this.$store.state.qr
		},
		url: function() {
			return this.$store.state.url
		}
	},
	methods: {
		reset: function() {
			this.$store.dispatch('resetState')
			this.$router.replace('/')
		},
		copy: function() {
			const resp = document.getElementById('short').href
			const $body = document.getElementsByTagName('body')[0]
			const $tempInput = document.createElement('INPUT')
			$body.appendChild($tempInput)
			$tempInput.setAttribute('value', resp)
			$tempInput.select()
			document.execCommand('copy')
			$body.removeChild($tempInput)
			const p = document.getElementById('copy')
			p.innerHTML = 'Copied!'
			p.style.color = '#fff'
			setTimeout(function() {
				p.innerHTML = 'Copy URL'
				p.style.color = '#60ddaf'
			}, 1000)
		}
	}
}
</script>

<style scoped>
    #result {
        -webkit-animation: fadein 1s;
        /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 1s;
        /* Firefox < 16 */
        -ms-animation: fadein 1s;
        /* Internet Explorer */
        -o-animation: fadein 1s;
        /* Opera < 12.1 */
        animation: fadein 1s;
    }

    .qr{
        width: 200px;
    }

    .options {
        text-align: center;
    }

    .copy {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-weight: 700;
        font-style: normal;
        color: #60ddaf;
        text-align: center;
        display: inline-block;
        cursor: pointer;
    }

    .copy:hover {
        opacity: .8;
    }

    .or {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-weight: 700;
        font-style: normal;
        color: #fff;
        text-align: center;
        display: inline-block;
        margin: 5px;
    }
</style>
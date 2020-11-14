<template>
    <footer>
        <div class="footer">
            <h1 class="noselect"><a class="link" href="https://qrgen.cc"><img src="/static/icon.png" class="logo"><span style="color: #fff;">QrGen</span>.cc</a></h1>
            <p> is a free service that lets you create QR-Codes and shortened URLs from any link quickly and easily. Just add <a class="link" href="https://qrgen.cc">qrgen.cc/</a> infront of a URL or manually enter the URL on the home page.</p>
            <p>Created by <a class="link" href="https://github.com/BetaHuhn">BetaHuhn</a></p>
            <p>Icons made by <a class="link" href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a class="link" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
            <ul class="nav noselect">
                <li><a class="link" href="/">HOME</a></li>
                <li><router-link class="link" to="/privacy">PRIVACY</router-link></li>
                <li><router-link class="link" to="/inprint">INPRINT</router-link></li>
                <li><a class="link" href="mailto:webmaster@mxis.ch">CONTACT</a></li>
            </ul>
        </div>
    </footer>
</template>

<script>
 export default {
     name: 'Footer',
 }
</script>

<style scoped>
	footer{
		width: 100%;
		background-color: #191c1c;
		position: absolute;
	}
	.footer{
		max-width: 400px;
		margin: auto;
		margin-top: 3rem;
		margin-bottom: 3rem;
		text-align: center;
		font-size: 15px;
		padding: 0px 10px;
	}
	.nav{
		display: flex;
		list-style: none;
		padding: 0;
		justify-content: center;
		font-weight: 600;
	}
	.nav li{
		margin: 1rem;
	}
</style>

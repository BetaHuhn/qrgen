<template>
	<div id="inprint">
		<main>
			<div class="content">
				<h1>Inprint</h1>
				<h2>Address</h2>
				<p class="text">Maximilian Schiller<br />
					Kronbühlstr. 11a<br />
					78351 Bodman-Ludwigshafen</p>
				<h2>Contact</h2>
				<p class="text">E-Mail: <a href="mailto:contact@mxis.ch">contact@mxis.ch</a></p>
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
		name: 'App',
		components: {
			Footer, By
		}
	}
</script>

<style>
	#inprint{
		height: 100%;
	}
	#inprint .content{
		width: 300px;
		height: 100%;
		margin: auto;
		-webkit-animation: fadein 1s;
		-moz-animation: fadein 1s;
		-ms-animation: fadein 1s;
		-o-animation: fadein 1s;
		animation: fadein 1s;
	}

	a {
		text-decoration: none;
		color: #60ddaf;
		font-weight: 600;
	}

	h1 {
		text-align: center;
	}
</style>
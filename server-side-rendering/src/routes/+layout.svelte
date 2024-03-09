<script lang="ts">
	import '@appwrite.io/pink';
	import '@appwrite.io/pink-icons';
	import AppwriteLogoDark from '$lib/images/appwrite-logo-dark.svg';
	import LoginImageDark from '$lib/images/login-dark-mode.png';
</script>

<svelte:head><title>Server side rendering with Appwrite</title></svelte:head>

<main class="grid-1-1 is-full-page" id="main">
	<section class="u-flex u-flex-vertical" style:--url={`url(${LoginImageDark})`}>
		<div class="tag-line is-not-mobile">
			<p>Server side rendering<span class="underscore">_</span></p>
		</div>
		<div class="u-flex u-stretch" />
		<div class="logo u-flex u-gap-16">
			<a href="/">
				<img src={AppwriteLogoDark} width="160" class="u-block" alt="Appwrite Logo" />
			</a>
		</div>
	</section>
	<section class="grid-1-1-col-2 u-flex u-main-center u-cross-center _u-padding-16-mobile">
		<div class="container u-flex u-flex-vertical u-cross-center u-main-center">
			<slot />
		</div>
	</section>
</main>

<style>
	#main section:first-child {
		padding-block-start: 2.25rem;
		padding-block-end: 2rem;
	}

	#main section:first-child div {
		padding-inline-start: 1rem;
		padding-inline-end: 1rem;
		padding-block-end: 1rem;
	}

	#main section:first-child .tag-line {
		font-size: 4rem;
		font-style: normal;
		font-weight: 400;
		line-height: 100%; /* 80px */
		letter-spacing: -1.6px;
		backdrop-filter: blur(0.5rem);
	}

	#main section:first-child .tag-line .underscore {
		-webkit-text-fill-color: #f02e65;
	}

	@media (min-width: 768px) {
		#main section:first-child {
			background: var(--url);
			background-repeat: no-repeat;
			background-position: top;
			background-size: cover;
			padding-block-start: 6.25rem;
			padding-block-end: 6.875rem;
		}

		#main section:first-child div {
			padding-inline-start: 2.625rem;
			padding-inline-end: 2rem;
		}
	}

	@media (min-width: 1199px) {
		#main section:first-child div {
			padding-inline-start: 5.625rem;
			padding-inline-end: 5rem;
		}

		#main section:first-child .tag-line {
			font-size: 5rem;
		}
	}

	.tag-line {
		background: linear-gradient(45deg, white, white 60%, #fd376f);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>

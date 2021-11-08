<script lang="ts">
	var url: string;
	var code: string;

	var done = false;
	var shortUrl: string;

	async function submit() {
		done = false;
		const res = await fetch(`http://localhost:3000/api/shorten`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				url,
				code
			})
		});

		const json = await res.json();

		if (res.ok) {
			shortUrl = json.shortUrl;
			done = true;
		} else {
			alert(json.error);
		}
	}
</script>

<h1>URL Shortener</h1>

<form action="" on:submit|preventDefault>
	<input type="text" placeholder="Url to shorten" bind:value={url} />
	<input type="text" placeholder="Code (optional)" bind:value={code} />

	<button on:click={submit}>Shorten</button>
</form>

{#if done}
	<h2>Your shortened URL: <a rel="external" href={shortUrl}>{shortUrl}</a></h2>
{/if}

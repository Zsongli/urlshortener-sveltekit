<script lang="ts" context="module">
	export async function load({ fetch }) {
		try {
			const res = await fetch("/api/shorten", {
				method: "GET"
			});

			const json = await res.json();

			if (!res.ok)
				return {
					status: res.status,
					error: new Error(json.error)
				};

			return {
				props: {
					urls: json.urls
				}
			};
		} catch (error) {
			return {
				status: 500,
				error: new Error("Something went wrong.")
			};
		}
	}
</script>

<script lang="ts">
	export var urls;
</script>

<h1>Already shortened URLs</h1>

<table>
	<thead>
		<td>Original URL</td>
		<td>Code</td>
	</thead>
	{#each urls as { url, code }}
		<tr>
			<td>{url}</td>
			<td>{code}</td>
			<td>
				<button
					on:click={() => {
						fetch("/api/shorten", {
							method: "DELETE",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								code
							})
						});
						window.location.reload();
					}}>x</button
				>
			</td>
		</tr>
	{/each}
</table>

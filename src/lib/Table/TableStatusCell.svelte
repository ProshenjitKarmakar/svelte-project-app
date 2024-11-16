<script>
	import { Badge } from "flowbite-svelte";

    export let status;
</script>

<div>
    {#if status === 'active'}
        <Badge color="green">Active</Badge>
    {:else if status === 'retired'}
        <Badge color="red">Retired</Badge>
    {:else if status === 'under construction'}
        <Badge color="indigo">Under Construction</Badge>
    {:else}
        <Badge rounded color="red">Unknown</Badge>
    {/if}
</div>
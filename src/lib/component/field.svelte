<script>
    import { onMount } from 'svelte';
    import { spnForm } from '../../store.js';

    export let id;
    export let label;
    export let type = "numeric";

    onMount(() => {
        $spnForm[id] = null;
    })

</script>

<div>
    {#if type === "binary"}
        <input type="checkbox" id={id} bind:checked={$spnForm[id]}>
    {:else if type === "numeric"}
        <input type="numeric" id={id} bind:value={$spnForm[id]}>
    {:else if type === "text"}
        <input type="text" id={id} bind:value={$spnForm[id]}>
    {/if}
    <label for={id}>{label ?? "var"}</label>
    <span id={id + "_err"} class="err">Cannot be blank</span>
</div>

<style lang="scss">
    .err {
        display: none;
        color: #8f0000;
        background: #ff9393;
        border: solid 1px #8f0000;
    }
</style>
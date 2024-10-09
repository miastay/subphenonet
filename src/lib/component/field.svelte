<script>
    import { onMount } from 'svelte';
    import { spnForm } from '../../store.js';

    export let id;
    export let label;
    export let type = "numeric";
    export let range;

    onMount(() => {
        $spnForm[id] = null;
    })

    let warning = null;
    let value = null;

    function test(val) {
        value = val;
        if(type !== "numeric") return true;
        if(range && range.length == 2) {
            if(value < range[0]) {
                warning = `lower than expected (min == ${range[0]})`
            } else if (value > range[1]) {
                warning = `higher than expected (max == ${range[1]})`
            }
        }
    }

</script>

<div>
    {#if type === "binary"}
        <div>
            <label for={id}>{label ?? "<VAR>"}</label>
            <input type="radio" id={id + '_true'} value={1} bind:group={$spnForm[id]} on:change={(e) => test(e.target.value)}>
            <label for={id + '_true'}>TRUE</label>
            <input type="radio" id={id + '_false'} value={0} bind:group={$spnForm[id]} on:change={(e) => test(e.target.value)}>
            <label for={id + '_false'}>FALSE</label>
        </div>
    {:else if type === "numeric"}
        <div>
            <label for={id}>{label ?? "<VAR>"}</label>
            <input type="numeric" id={id} bind:value={$spnForm[id]} on:change={(e) => test(e.target.value)}>
        </div>
    {:else if type === "text"}
        <div>
            <label for={id}>{label ?? "<VAR>"}</label>
            <input type="text" id={id} bind:value={$spnForm[id]} on:change={(e) => test(e.target.value)}>
        </div>
    {/if}
    <span id={id + "_err"} class="err">Cannot be blank</span>
    <span id={id + "_err"} class="err">Cannot be blank</span>
    {#if warning !== null}
        <span id={id + "_warn"} class="warn">Double-check: value {value} is {warning}</span>
    {/if}
</div>

<style lang="scss">
    .err {
        display: none;
        color: #8f0000;
        background: #ff9393;
        border: solid 1px #8f0000;
    }
    .warn {
        color: #8b0076;
        background: #ffc5f6;
        border: solid 1px #8b0076;
        padding: 0.25rem;
        margin-top: 0.5rem;
    }
    label {
        margin-right: 0.5rem;
    }
</style>
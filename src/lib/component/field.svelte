<script>
    import { onMount } from 'svelte';
    import { spnForm, errored } from '../../store.js';
    import { Badge, Indicator, Popover } from 'flowbite-svelte';

    export let id;
    export let label;
    export let type = "numeric";
    export let range;
    export let units = '';

    onMount(() => {
        $spnForm[id] = null;
    })

    let warning = null;
    let value = null;

    function test(val) {
        clearWarnings()
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

    function clearWarnings() {
        warning = null;
        $errored[id] = false;
    }

</script>

<div class="field">
    {#if warning !== null}
        <div class="message">
            <div id={id + "_warn"} class="indicator warn">
                ?
            </div>
            <!-- <Badge id={id + "_warn"} color="yellow">!</Badge> -->
            <Popover color="yellow" triggeredBy={"#" + id + "_warn"}>{`Double-check: value ${value} is ${warning}`}</Popover>
        </div>
    {/if}
    {#if $errored[id] == true} 
        <div class="message">
            <div id={id + "_err"} class="indicator error">
                !
            </div>
            <Popover color="red" triggeredBy={"#" + id + "_err"}>{`Cannot be blank`}</Popover>
        </div>
    {/if}
    {#if type === "binary"}
        <label for={id}>{label ?? "<VAR>"}</label>
        <input type="radio" id={id + '_true'} value={1} bind:group={$spnForm[id]} on:change={(e) => test(e.target.value)}>
        <label for={id + '_true'}>TRUE</label>
        <input type="radio" id={id + '_false'} value={0} bind:group={$spnForm[id]} on:change={(e) => test(e.target.value)}>
        <label for={id + '_false'}>FALSE</label>
    {:else if type === "numeric"}
        <label for={id}>{label ?? "<VAR>"}</label>
        <input type="number" id={id} bind:value={$spnForm[id]} on:change={(e) => test(e.target.value)} placeholder={units}>
    {:else if type === "text"}
        <label for={id}>{label ?? "<VAR>"}</label>
        <input type="text" id={id} bind:value={$spnForm[id]} on:change={(e) => test(e.target.value)}>
    {:else if type === "token"}
        <label for={id}>{label ?? "<VAR>"}</label>
        <input type="password" id={id} bind:value={$spnForm[id]} on:change={(e) => test(e.target.value)}>
    {/if}
</div>

<style lang="scss">
    .err {
        display: none;
        margin-right: 0.25rem;
    }
    .indicator {
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 0.75rem;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .warn {
        color: #8b6400;
        background: #fff4c5;
        border: solid 1px #8b6400;
    }
    .error {
        color: #8b0035;
        background: #ffc5d6;
        border: solid 1px #8b0035;
    }
    .message {
        margin-right: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    label {
        margin-right: 0.5rem;
    }
    input {
        border: solid 1px black;
        padding: 0.25rem;
    }
    .field {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>
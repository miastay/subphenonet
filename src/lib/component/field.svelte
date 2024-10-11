<script>
    import { onMount } from 'svelte';
    import { spnForm, errored, inputType, columns } from '../../store.js';
    import { Badge, Indicator, Popover } from 'flowbite-svelte';
    import { EyeOutline, EyeSlashOutline, ChevronDownOutline } from 'flowbite-svelte-icons';
    import Dropsearch from './dropsearch.svelte';

    export let id;
    export let label;
    export let type = "numeric";
    export let range;
    export let units = '';

    let eye = false;

    onMount(() => {
        $spnForm[id] = null;
    })

    let warning = null;
    let value = null;

    function test(val) {
        clearWarnings()
        value = val;
        console.log(Number.parseFloat(value))
        if(type !== "numeric") return;
        if(type === "numeric" && Number.isNaN(Number.parseFloat(value))) {
            warning = `not a number`;
            return;
        }
        if(range && range.length == 2) {
            if(value < range[0]) {
                warning = `significantly low (5% == ${range[0]})`
            } else if (value > range[1]) {
                warning = `significantly high (95% == ${range[1]})`
            }
        }
    }

    function clearWarnings() {
        warning = null;
        $errored[id] = false;
    }

    let dropdownOpen = false;

</script>

<div class="field">
    {#if warning !== null}
        <div class="message" disabled aria-disabled="true" tabindex={5000}>
            <div id={id + "_warn"} class="indicator warn" disabled aria-disabled="true" tabindex={5000}>
                ?
            </div>
            <!-- <Badge id={id + "_warn"} color="yellow">!</Badge> -->
            <Popover color="yellow" triggeredBy={"#" + id + "_warn"} disabled aria-disabled="true" tabindex={5000}>{`Double-check: value ${value} is ${warning}`}</Popover>
        </div>
    {/if}
    {#if $errored[id] == true} 
        <div class="message" disabled aria-disabled="true" tabindex={5000}>
            <div id={id + "_err"} class="indicator error" disabled aria-disabled="true" tabindex={5000}>
                !
            </div>
            <Popover color="red" triggeredBy={"#" + id + "_err"} disabled aria-disabled="true" tabindex={5000}>{`Cannot be blank`}</Popover>
        </div>
    {/if}

    {#if $inputType === "single" || (type === "token" || type === "user")}
        {#if type === "binary"}
            <label for={id}>{label ?? "<VAR>"}</label>
            <input type="radio" id={id + '_true'} value={1} bind:group={$spnForm[id]} on:change={(e) => test(e.target.value)}>
            <label for={id + '_true'} class={'ml-1'}>TRUE</label>
            <input type="radio" id={id + '_false'} class={'ml-2'} value={0} bind:group={$spnForm[id]} on:change={(e) => test(e.target.value)}>
            <label for={id + '_false'} class={'ml-1'}>FALSE</label>
        {:else if type === "numeric"}
            <label for={id}>{label ?? "<VAR>"}</label>
            <input type="number" id={id} bind:value={$spnForm[id]} on:change={(e) => test(e.target.value)} placeholder={units} class={(($errored[id] == true) ? 'errored' : '') + ((warning !== null) ? 'warned' : '')}>
        {:else if type === "text"}
            <label for={id}>{label ?? "<VAR>"}</label>
            <input type="text" id={id} bind:value={$spnForm[id]} on:change={(e) => test(e.target.value)} class={(($errored[id] == true) ? 'errored' : '') + ((warning !== null) ? 'warned' : '')}>
        {:else if type === "token"}
            <label for={id}>{label ?? "<VAR>"}</label>
            <input type="password" id={id} bind:value={$spnForm[id]} on:change={(e) => test(e.target.value)} class={(($errored[id] == true) ? 'errored' : '') + ((warning !== null) ? 'warned' : '')}>
            <button class="ml-2" on:click={() => {let elem = document.querySelector(`#${id}`); eye = (elem.type === "password"); eye ? elem.type = "text" : elem.type = "password"}}>
                {#if eye}
                    <EyeSlashOutline class="w-6 h-6 text-black"/>
                {:else}
                    <EyeOutline class="w-6 h-6 text-black"/>
                {/if}
            </button>
        {:else}
            <label for={id}>{label ?? "<VAR>"}</label>
            <input type="username" id={id} bind:value={$spnForm[id]} on:change={(e) => test(e.target.value)} class={(($errored[id] == true) ? 'errored' : '') + ((warning !== null) ? 'warned' : '')}>
        {/if}
    {:else}
        <Dropsearch id={id} label={label} />
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
        &.errored {
            border-color: #cf004f;
        }
        &.warned {
            border-color: #cb9200;
        }
    }
    .field {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>
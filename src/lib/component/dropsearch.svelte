<script>
    import { ChevronDownOutline } from 'flowbite-svelte-icons';
    import { Dropdown, DropdownItem } from 'flowbite-svelte';
    import { columns, spnForm } from '../../store';

    export let label;
    export let id;

    let dropdownOpen = false;
    let search = '';

</script>

<div class="dropsearch">
    <label for={id}>{label ?? "<VAR>"}</label>
    <button id={id + '_true'} >{`${$spnForm[id] == null ? '<select>' : $spnForm[id]}`}<ChevronDownOutline class="w-6 h-6 ms-2 text-black dark:text-black" /></button>
    <Dropdown bind:open={dropdownOpen} containerClass={'max-h-[350px] overflow-y-scroll'}>
        <div class='search'>
            <input type="text" on:input={(e) => search = e.target.value} placeholder='search...'>
        </div>
        {#each $columns as col}
            {#if (col.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || search == "")}
                <DropdownItem on:click={() => {dropdownOpen = false; $spnForm[id] = col}}>
                    {col}
                </DropdownItem>
            {/if}
        {/each}
    </Dropdown>
</div>

<style lang="scss">
    .dropsearch {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
        button {
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
            border: solid 1px black;
            padding: 0.2rem;
        }
        .search {
            position: sticky;
            top: 0;
            width: 100%;
            padding: 0.5rem;
            background: white;
            > input {
                width: 100%;
            }
        }
    }
</style>

<script>
    import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';
    import { modelType } from '../../store';

    let dropdownOpen = false;

</script>

<div>
    <button class="top">{`Using ${$modelType} model`}<ChevronDownOutline class="w-6 h-6 ms-2 text-black dark:text-black" /></button>
    <Dropdown bind:open={dropdownOpen}>
        <DropdownItem on:click={() => {dropdownOpen = false; $modelType = "full"}}>
            {`Full (16 variables)`}
        </DropdownItem>
        <DropdownItem on:click={() => {dropdownOpen = false; $modelType = "small"}}>
            {`Small (6 variables)`}
        </DropdownItem>
    </Dropdown>
</div>

<style>
    button.top {
        border: solid 1px black;
        display: flex;
        flex-direction: row;
        padding: 0.25rem;
    }
</style>


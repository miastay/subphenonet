<script>
    import { Dropzone } from 'flowbite-svelte';
    import { CloseCircleOutline } from 'flowbite-svelte-icons';

    export let value = [];
    export let accepts = "";
  
    const dropHandle = (event) => {
      value = [];
      event.preventDefault();
      if (event.dataTransfer.items) {
        [...event.dataTransfer.items].forEach((item, i) => {
          if (item.kind === 'file') {
            const file = item.getAsFile();
            value.push(file);
            value = value;
          }
        });
      } else {
        [...event.dataTransfer.files].forEach((file, i) => {
          value = file;
        });
      }
    };
  
    const handleChange = (event) => {
      const files = event.target.files;
      if (files.length > 0) {
        value.push(files[0]);
        value = value;
      }
    };
  
    const showFiles = (files) => {
        return files[0];
    };
  </script>

<div class="dropzone-container">
    <Dropzone
        id="dropzone"
        accept=".txt, .csv, .tsv"
        defaultClass='flex flex-col justify-center items-center w-full px-8 py-[0.31rem] align-center bg-white border-[1.5px] border-black border-dashed cursor-pointer hover:bg-gray-50'
        on:drop={dropHandle}
        on:dragover={(event) => {
            event.preventDefault();
        }}
        on:change={handleChange}>
        {#if value.length === 0}
            <p class="text-sm text-black dark:text-black font-semibold">Batch upload</p>
        {:else}
            <p class="text-sm text-black dark:text-black font-semibold">{value[0].name.substr(0, 15)}</p>
        {/if}
    </Dropzone>
    {#if value.length !== 0}
        <button class="clear" on:click={() => value = []}>
            <CloseCircleOutline class="w-5 h-5" />
        </button>
    {/if}
</div>


<style lang="scss">
    .dropzone-container {
        display: flex;
        flex-direction: row;
    }
    button.clear {
        padding: 0.15rem;
        margin-left: 0.25rem;
    }
</style>
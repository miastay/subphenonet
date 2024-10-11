<script>
    import { modelType } from "../../store";
    import Full from "./full.svelte";
    import Selector from "./selector.svelte";
    import Small from "./small.svelte";
    import Submit from "./submit.svelte";

    let key = "";
    const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

    function fetchSheet() {
        gapi.load('client', initializeGapiClient);
    }

    async function n() {
        gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: '1ARawxm4cXoQbshGQGWuBUPBFHja1TryV_rypn504y8I',
            range: 'Sheet1!A1',
            valueInputOption: "RAW",
            resource: { values: [
                [ "abc", "def", "ghi" ]
            ]},
        }).then((response) => {
            const result = response.result;
            console.log(`${result.updates.updatedCells} cells appended.`);
            if (callback) callback(response);
        });

        let response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1ARawxm4cXoQbshGQGWuBUPBFHja1TryV_rypn504y8I',
            range: 'Sheet1!A1:A10',
        });
        console.log(response)
        return response;
    }

    async function initializeGapiClient() {
        console.log(key)
        await gapi.client.init({
          apiKey: key,
          discoveryDocs: [DISCOVERY_DOC],
        });

        // await gapi.client.sheets.spreadsheets.values.get({
        //     spreadsheetId: '1ARawxm4cXoQbshGQGWuBUPBFHja1TryV_rypn504y8I',
        //     range: 'Class Data!A2:E',
        // });
        console.log("init?")
    }

</script>

<svelte:head>
    <script async defer src="https://apis.google.com/js/api.js"></script>
</svelte:head>
<div class="form">

    <div id="selector">
        <Selector />
    </div>

    {#if $modelType === "small"}
        <Small />
    {:else}
        <Full />
    {/if}
    
</div>

<style lang="scss">
    .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-width: 33vw;
    }
    
</style>
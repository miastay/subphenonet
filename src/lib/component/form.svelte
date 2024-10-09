<script>
    import { spnForm } from "../../store";
    import Field from "./field.svelte";
    import Submit from "./submit.svelte";

    let key = "";
    const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

    function fetchSheet() {
        gapi.load('client', initializeGapiClient);
    }

    async function initializeGapiClient() {
        console.log(key)
        await gapi.client.init({
          apiKey: key,
          discoveryDocs: [DISCOVERY_DOC],
        });
        console.log("init?")
    }

</script>

<svelte:head>
    <script async defer src="https://apis.google.com/js/api.js"></script>
</svelte:head>
<div class="form">

    <input type="text" id="api_key" bind:value={key}/>
    <label for="api_key">API key</label>
    <button on:click={() => fetchSheet()}>fetch</button>
    
    <div id="pelod" class="category">
        <h3>PELOD values</h3>
        <Field id="pelodwbc" label="White blood cell count" type="numeric"/>
        <Field id="pelodplate" label="Platelet count" type="numeric" />
        <Field id="pelodpt" label="Prothrombin time" type="numeric" />
        <Field id="pelodhr" label="Systolic heart rate" type="numeric" />
        <Field id="pelodlact" label="Lactate" type="numeric" />
    </div>

    <div id="prism" class="category">
        <h3>PRISM values</h3>
        <Field id="prismpao2lo" label="PAO2" type="numeric" />
        <Field id="prismbunhi" label="Blood urea nitrogen" type="numeric" />
        <Field id="prismph" label="Blood pH" type="numeric" />
        <Field id="prismtemphi" label="Temperature" type="numeric" />
        <Field id="prismgluc" label="Blood glucose" type="numeric" />
    </div>

    <div id="prism" class="category">
        <h3>Demographic</h3>
        <Field id="wt" label="Weight" type="numeric" />
        <Field id="bicarb" label="Bicarbonate" type="numeric" />
        <Field id="intub" label="Intubated?" type="binary" />
        <Field id="prisminpt" label="Admitted from inpatient unit?" type="binary" />
        <Field id="prismprevadm" label="Previous ICU admission?" type="binary" />
        <Field id="prismcancer" label="Cancer?" type="binary" />
    </div>

    <div class="category">
        <div>
            <input type="text" id="pid" bind:value={$spnForm["pid"]}/>
            <label for="pid">Unique identifier</label>
        </div>
        <Submit />
    </div>
    
</div>

<style lang="scss">
    .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .category {
        border: solid 1px black;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    h3 {
        margin-block: 0.5rem;
    }
</style>
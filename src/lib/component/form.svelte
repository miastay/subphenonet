<script>
    import { spnForm } from "../../store";
    import Field from "./field.svelte";
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

    <div id="pelod" class="category">
        <h3>PELOD values</h3>
        <Field id="pelodwbc" label="White blood cell count" type="numeric"/>
        <Field id="pelodplate" label="Platelet count" type="numeric" />
        <Field id="pelodpt" label="Prothrombin time" type="numeric" />
        <Field id="pelodhr" label="Heart rate" type="numeric" range={[56, 135]} units={'bpm'}/>
        <Field id="pelodlact" label="Lactate" type="numeric" />
        <Field id="bicarb" label="Bicarbonate" type="numeric" />
    </div>

    <div id="prism" class="category">
        <h3>PRISM values</h3>
        <Field id="prismpao2lo" label="PAO2" type="numeric" />
        <Field id="prismbunhi" label="Blood urea nitrogen" type="numeric"/>
        <Field id="prismph" label="Blood pH" type="numeric" range={[6.8, 7.5]} units={'pH'}/>
        <Field id="prismtemphi" label="Temperature" type="numeric" range={[20, 35]} units={'degrees Celsius'}/>
        <Field id="prismgluc" label="Blood glucose" type="numeric" range={[80, 210]} units={'mg/dL'}/>
    </div>

    <div id="prism" class="category">
        <h3>Demographics</h3>
        <Field id="wt" label="Weight" type="numeric" units={'kg'}/>
        <Field id="intub" label="Intubated?" type="binary" />
        <Field id="prisminpt" label="Admitted from inpatient unit?" type="binary" />
        <Field id="prismprevadm" label="Previous ICU admission?" type="binary" />
        <Field id="prismcancer" label="Cancer?" type="binary" />
    </div>

    <div class="category">
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
        margin-block: 0rem;
        font-size: large;
        font-weight: 700;
    }
</style>
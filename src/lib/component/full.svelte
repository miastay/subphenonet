<script>
    import Field from "./field.svelte";
    import Submit from "./submit.svelte";
</script>

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

<style lang='scss'>
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
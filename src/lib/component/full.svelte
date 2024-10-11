<script>
    import { lastPrediction } from "../../store";
import Field from "./field.svelte";
    import Result from "./result.svelte";
    import Submit from "./submit.svelte";
</script>

<div id="pelod" class="category">
    <h3>PELOD values</h3>
    <Field id="pelodwbc" label="White blood cell count" type="numeric" range={[0.5, 21.9]} units={'10^3 cells/µL'}/>
    <Field id="pelodplate" label="Platelet count" type="numeric" range={[17, 347.85]} units={'10^3 cells/µL'}/>
    <Field id="pelodpt" label="Prothrombin time" type="numeric" range={[12.9, 23.5]} units={'sec'}/>
    <Field id="pelodhr" label="Heart rate" type="numeric" range={[94, 195]} units={'bpm'}/>
    <Field id="pelodlact" label="Lactate" type="numeric" range={[0.89, 7]} units={'mmol/L'}/>
</div>

<div id="prism" class="category">
    <h3>PRISM values</h3>
    <Field id="prismbunhi" label="Blood urea nitrogen" type="numeric" range={[4, 52]} units={'mg/dL'}/>
    <Field id="prismph" label="Blood pH" type="numeric" range={[7.05, 7.47]} units={'pH'}/>
    <Field id="prismtemphi" label="Highest temperature" type="numeric" range={[36.6, 40.0]} units={'°C'}/>
</div>

<div id="prism" class="category">
    <h3>Demographics</h3>
    <Field id="wt" label="Weight" type="numeric" units={'lbs'} range={[5.8, 63.0]}/>
    <Field id="sex" label="Male?" type="binary" />
    <Field id="intub" label="Intubated?" type="binary" />
    <Field id="prisminpt" label="Admitted from inpatient unit?" type="binary" />
    <Field id="prismnonop" label="Nonoperative?" type="binary" />
    <Field id="prismcancer" label="Cancer?" type="binary" />
</div>

<div class="category">
    <Submit />
</div>

{#if $lastPrediction !== null}
    <div class="category">
        <Result result={$lastPrediction}/>
    </div>
{/if}


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
<script>
    import Field from "./field.svelte";
    import Submit from "./submit.svelte";
</script>

<div id="all" class="category">
    <Field id="pelodpt" label="Prothrombin time" type="numeric" />
    <Field id="pelodlact" label="Lactate" type="numeric" />
    <Field id="prismbunhi" label="Blood urea nitrogen" type="numeric"/>
    <Field id="prismph" label="Blood pH" type="numeric" range={[6.8, 7.5]} units={'pH'}/>
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
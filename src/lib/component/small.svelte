<script>
    import Field from "./field.svelte";
    import Submit from "./submit.svelte";
</script>

<div id="all" class="category">
    <span>Not yet implemented</span>
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
<script>
    import Form from "../lib/component/form.svelte";
    import Nav from "../lib/component/nav.svelte";
</script>

<main>
    <Nav/>
    <div class="content">
        <Form />
    </div>
</main>


<style lang="scss">
    h1 {
        color: blue;
        div {
            color: purple;
        }
    }
    .content {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

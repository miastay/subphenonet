<script>
    import { LayersSolid } from 'flowbite-svelte-icons';
</script>

<div class="nav">
    <h3>
        <LayersSolid class="w-8 h-8 text-[#520cf5]"/>
        subphenonet
    </h3>
    <h4>For issues contact: <a href="mailto:mstaylor@mednet.ucla.edu">mstaylor@mednet.ucla.edu</a></h4>
</div>

<style lang="scss">
    .nav {
        display: flex;
        height: 80px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: #ddd;
        padding: 1rem;
        h3 {
            font-size: xx-large;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;
        }
        h4 {
            font-size: large;
        }
        a {
            text-decoration: underline;
        }
    }
</style>
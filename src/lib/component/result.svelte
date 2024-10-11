<script>
    export let result;
</script>

<div class={`result ${result === true ? "positive" : "negative"}`}>
    This sample is <strong>{result === true ? "hyperinflammatory" : "hypoinflammatory"}</strong> and should be <strong>{result === true ? "SCREENED IN" : "EXCLUDED"}</strong>
</div>

<style lang="scss">
    .result {
        padding: 1rem;
        @apply rounded-md;
        &.positive {
            background: #00ff8c;
        }
        &.negative {
            background: #ffbaad;
        }
    }
</style>
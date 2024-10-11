import { readonly, writable } from "svelte/store";

export let spnForm = writable({})
export let errored = writable({})
export let modelType = writable("full")
export let lastPrediction = writable(null);

export let upload = writable(null);
export let columns = writable([]);

export let inputType = writable("single");
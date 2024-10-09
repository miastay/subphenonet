import { readonly, writable } from "svelte/store";

export let spnForm = writable({})
export let errored = writable({})
export let modelType = writable("full")
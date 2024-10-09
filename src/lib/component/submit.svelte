<script>
    import { spnForm, errored, modelType } from "../../store";
    import Field from "./field.svelte";

    function submit() {
        let error = false;
        console.log($spnForm)
        $errored = {...$spnForm}
        for(let item of Object.keys($spnForm)) {
            $errored[item] = false;
            if($spnForm[item] === null || $spnForm[item] === '') {
                $errored[item] = true;
                error = true;
            }
        }
        console.log($errored)
        if(!errored) {
            let key = $spnForm['token'];
            console.log(key)
            fetch('https://sheetdb.io/api/v1/drdre24m4zs0o', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + key 
                },
                body: JSON.stringify({
                    data: [
                        {
                            'uuid': "INCREMENT",
                            'time': `=EPOCHTODATE(${Date.now()}, 2)`,
                            'token': key,
                            'type': $modelType,
                            ...$spnForm
                        }
                    ]
                })
            })
            .then((response) => response.json())
            .then((data) => console.log(data));

            return;
        }
    }
</script>

<div class="submit">
    <Field id="token" label="API key" type="token"/>
    <button on:click={() => submit()}>Submit</button>
</div>

<style lang="scss">
    .submit {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    input {
        border: solid 1px black;
    }

    button {
        background: linear-gradient(266deg, rgba(29,12,245,1) -100%, rgba(177,55,255,1) 200%);
        padding: 0.5rem;
        color: white;
        border-radius: 3px;
    }

</style>
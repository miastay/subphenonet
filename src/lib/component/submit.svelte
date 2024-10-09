<script>
    import { spnForm } from "../../store";

    let key = "";

    let submit = () => {
        console.log($spnForm)
        document.querySelectorAll(".err").forEach((e) => e.style.display = "none");
        setTimeout(() => {}, 500);
        let errored = false;
        for(let item of Object.keys($spnForm)) {
            if($spnForm[item] == null) {
                document.getElementById(item + "_err").style.display = "block";
                errored = true;
            }
        }
        if(!errored) {
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
    <div>
        <input type="text" id="api_key" bind:value={key}/>
        <label for="api_key">API key</label>
    </div>
    <button on:click={() => submit()}>Submit Form</button>
</div>

<style lang="scss">
    .submit {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>
<script>
    import { onMount } from "svelte";
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
        if(!error) {
            console.log("writing..")
            fire()
        }
    }

    async function gsheet() {
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


    import { initializeApp } from 'firebase/app';
    import { getFirestore, collection, serverTimestamp, getDoc, doc, addDoc } from 'firebase/firestore/lite';

    async function fire() {
   
        // Follow this pattern to import other Firebase services
        // import { } from 'firebase/<service>';

        let key = $spnForm['api'].trim()
        let site = $spnForm['site'].trim()

        // TODO: Replace the following with your app's Firebase project configuration
        const firebaseConfig = {
            apiKey: key,
            authDomain: "subphenonet-6e099.firebaseapp.com",
            projectId: "subphenonet-6e099",
            storageBucket: "subphenonet-6e099.appspot.com",
            messagingSenderId: "883130851384",
            appId: "1:883130851384:web:57203fb97863654af306cd",
            measurementId: "G-7ZQ928FG6V"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        const siteRef = doc(db, 'sites', site);

        const docSnap = await getDoc(siteRef);
        if (!docSnap.exists()) {
            console.error("Could not find site.")
            return;
        }

        const nestedCollectionRef = collection(siteRef, 'samples');

        addDoc(nestedCollectionRef, {
            'data': {...$spnForm},
            'time': serverTimestamp()
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });

    }

</script>

<div class="submit">
    <Field id="site" label="Site key" type="user"/>
    <Field id="api" label="API key" type="token"/>
    <button class="mt-2" on:click={() => submit()}>Submit</button>
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
        background: linear-gradient(266deg, #1d0cf5 -100%, rgba(177,55,255,1) 200%);
        padding: 0.5rem;
        color: white;
        border-radius: 3px;
        &:active {
            outline: solid 4px #1d0cf5;
            outline-offset: 2px;
            transform: scale(0.97)
        }
        transition: transform 0.25s ease;
    }

</style>
<script>
    import { spnForm } from "../../store";

    let submit = () => {
        console.log($spnForm)
        document.querySelectorAll(".err").forEach((e) => e.style.display = "none");
        setTimeout(() => {}, 500);
        for(let item of Object.keys($spnForm)) {
            if($spnForm[item] == null) {
                document.getElementById(item + "_err").style.display = "block";
            }
        }
    }
</script>

<div>
    <button on:click={() => submit()}>Submit Form</button>
</div>
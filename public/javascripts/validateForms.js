// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".validated-form");

    // Loop over them and prevent submission
    Array.from(forms) //creates array from the different forms
        .forEach(function (form) {
            //for each form...
            form.addEventListener(
                //add event listener for each form for when it submits
                "submit",
                function (event) {
                    if (!form.checkValidity()) {
                        //check the validity
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    form.classList.add("was-validated");
                },
                false
            );
        });
})();
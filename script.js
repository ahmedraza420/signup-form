let inputs = document.querySelectorAll("input");

inputs.forEach(input => {
    input.addEventListener('blur', e => {
        if(!input.checkValidity())
        {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    });
    input.addEventListener('input', e => {
        if(input.checkValidity())
        {
            input.classList.add('valid');
            input.classList.remove("invalid");
        }
        if(input.getAttribute('id') == 'confirm'){
            if(!input.checkValidity())
            {
                input.classList.add('invalid');
                input.classList.remove('valid');
            }
        }
    });
});


let inputs = document.querySelectorAll("input");
let passTip = document.querySelector('#tip');
let passwordInput = document.querySelector('#password');
let confirmInput = document.querySelector('#confirm');
let containsSpecialChar = false;
const specialChars = "!@#$%^&*,./?;:'\|()-_+=[]{}`~ ";

let tipHeading = document.createElement('h3');
let tipMinLen = document.createElement('p');
let tipUpper = document.createElement('p');
let tipLower = document.createElement('p');
let tipSpecial = document.createElement('p');
let tipNumeric = document.createElement('p');

tipHeading.innerText = 'The password must contain:';

tipMinLen.innerText = 'At least 8 characters';
tipMinLen.classList.add('wrong');

tipUpper.innerText = 'An uppercase letter (A-Z)';
tipUpper.classList.add('wrong');

tipLower.innerText = 'A lowercase letter (a-z)';
tipLower.classList.add('wrong');

tipSpecial.innerText = 'A special character (!@#...)';
tipSpecial.classList.add('wrong');

tipNumeric.innerText = 'A number (0-9)';
tipNumeric.classList.add('wrong');

passTip.appendChild(tipHeading);
passTip.appendChild(tipMinLen);
passTip.appendChild(tipUpper);
passTip.appendChild(tipLower);
passTip.appendChild(tipSpecial);
passTip.appendChild(tipNumeric);

inputs.forEach(input => {
    input.addEventListener('blur', e => {
        if(!input.checkValidity() && input.value !== '' && input.getAttribute('id'))
        {
            swapClasses(input, 'valid', 'invalid');
        }
    });
    input.addEventListener('input', e => {
        if(input.checkValidity() || input.value == '')
        {
            swapClasses(input, 'invalid', 'valid');
        }
        if(input.getAttribute('id') == 'password'){
            if(input.checkValidity()) {
                swapClasses(passTip, 'wrong', 'right');
                tipHeading.innerText = 'It is a strong password';
                swapClasses(input, 'invalid', 'valid');
            }
            else {
                swapClasses(passTip, 'right', 'wrong');
                tipHeading.innerText = 'The password must contain:';
            }
            validatePassword(input);
            if (confirmInput.value != ''){
                comparePasswords(passwordInput, confirmInput)
            }
        }
        if(input.getAttribute('id') =='confirm') {
            comparePasswords(passwordInput, confirmInput); 
        }
    });
});

function validatePassword(input) {
    let inputText = input.value;
    inputText.length >= 8 ? swapClasses(tipMinLen, 'wrong', 'right') : swapClasses(tipMinLen, 'right', 'wrong');
    
    inputText !== inputText.toLowerCase() ? swapClasses(tipUpper, 'wrong', 'right') : swapClasses(tipUpper, 'right', 'wrong');

    inputText !== inputText.toUpperCase() ? swapClasses(tipLower, 'wrong', 'right') : swapClasses(tipLower, 'right', 'wrong');

    containsSpecialChar = false;
    Array.from(inputText).forEach(char => {
        if(specialChars.includes(char) || containsSpecialChar == true) {
            containsSpecialChar = true;
        }
        else {
            containsSpecialChar = false
        }
    });
    containsSpecialChar ? swapClasses(tipSpecial, 'wrong', 'right') : swapClasses(tipSpecial, 'right', 'wrong');
    inputText.split("").some(char => !isNaN(char) && char !== ' ') ? swapClasses(tipNumeric, 'wrong', 'right') : swapClasses(tipNumeric, 'right', 'wrong');
}

function swapClasses(element, class1, class2) { 
        element.classList.remove(class1);
        element.classList.add(class2);
}

function comparePasswords(passwordField, confirmField) {
    passwordField.value === confirmField.value ? swapClasses(confirmField, 'invalid', 'valid') : swapClasses(confirmField, 'valid', 'invalid');
}
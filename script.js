// VARIABLES

const firstInputText = document.querySelector('input[type=text]');
const otherInputText = document.querySelector('#other-title');

const jobRoleSelect = document.querySelector('#title');

// on load

firstInputText.focus();// selects the first input field and adds focus.
otherInputText.style.display = 'none';
otherInputText.style.position = 'relative';
otherInputText.style.transition = 'all .3s ease-in';
otherInputText.style.opacity = '0';
otherInputText.style.top = '20px';

// Revealing text field is user clicks on other

jobRoleSelect.addEventListener('click', e =>{
    if(e.target.textContent === 'Other'){
        otherInputText.style.display = 'block';
        window.setTimeout(() => {
            otherInputText.style.opacity = '1';
            otherInputText.style.top = '0px';
        }, 100);

    } else if(e.target.textContent !== 'Other'){
            otherInputText.style.opacity = '0';
            otherInputText.style.top = '40px';
            window.setTimeout(() =>{
                otherInputText.style.display = 'none';
            }, 400)
    }
})


/*****************************************************************************************************************************************
 * 
 * VARIABLES
 * 
 ************/ 
const form = document.querySelector('form');

const NameInputField = document.getElementById('name');
const MailInputField = document.getElementById('mail');
const personalDetails = document.getElementById('personal-details');


const jobRoleSelect = document.querySelector('#title');
const tShirtSelectionColor = document.querySelector('#color');  
const activityFieldSet = document.querySelector('.activities');  
const activityFieldSetInput = document.querySelectorAll('.activities input');


const js_puns = []; // All t-shirt colour options will be pushed to this array.
let iLoveJs; // All iloveJs colour tshirts will be spliced from js_puns and pushed into this variable.

const designSelection = document.querySelector('#design');  


// payment section variables
const paymentField = document.getElementById('payment-container');
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitCoin = document.getElementById('bitcoin');
const PaymentSelect = document.getElementById('payment');

const creditCardNumField = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');



/*****************************************************************************************************************************************
 * 
 * FUNCTIONS
 * 
 ************/ 


/***
 * 
 * This function will take a container, and whilst it has 1 or more child elements, they will all be removed. This will be applied on load for the T-shirt color selection.
 */

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
} // took the while loop code and adapted it from https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/




/***
 * 
 * This function will buid a option element that will be placed within a selection element.
 */ 

 function selectedOption (element, textContent, disabled, selected, optionValue) {
    const option = document.createElement(element);
    option.textContent = textContent;
    const disable = document.createAttribute(disabled);
    const select = document.createAttribute(selected);
    option.setAttributeNode(disable);
    option.setAttributeNode(select);
    option.value = optionValue;
   
    return option;
 }


/***
 * 
 * This function will add a setTimeout animation to a whatever arguement is passed.
 */ 
 
function elementAnimationIn (element) {
    window.setTimeout(() => {
        element.style.opacity = '1';
        element.style.top = '0px';
    }, 100);

}

function elementAnimationOut (element){
    element.style.opacity = '0';
    element.style.top = '40px';
    window.setTimeout(() =>{
        element.style.display = 'none';
    }, 400)
}

/***
 * 
 * This function create a red alert DOM element
 */ 

 function redAlert() {
    const div = document.createElement('div');
    div.className = 'conflict-alert';
    div.style.marginLeft = 'auto';
    
    const span = document.createElement('span');
    span.style.display = 'block';
    span.style.backgroundColor = 'red';
    span.style.borderRadius = '15px';
    span.style.width = '15px';
    span.style.height = '15px';                
    div.appendChild(span);

    return div;
 }


// This function will hide and show html nodes. This function is used in 2 places so far.
// It is called when the user clicks on the t-shirt theme selection element. 
// It is also called when the user clicks on the on the other option when the job selected element is clicked.
// This function initally hides the element, and then animates in when the respective element is triggered, and hides when another option is clicked.

 function showOrhideOption (element,selection,optionValue, isNotvalue) {
    const node = document.querySelector(`#${element}`);
    if(selection.value === optionValue) {
        node.style.display = 'block';
        elementAnimationIn(node);
    } else if(selection.value !== isNotvalue && optionValue === null){
        node.style.display = 'block';
        console.log(node);
        elementAnimationIn(node);
    }
    else {
        elementAnimationOut(node);
        }
};


// used to remove error message if it already exists.

function removeerrorMEssage (element){
    for(let i =0; i < element.children.length; i++){ // REMOVES ERROR MESSSAGE IF IT EXISTS
        if(element.children[i].tagName === 'P'){
            element.removeChild(element.children[i])
        }
}
}

 // ERROR MESSAGE

 // The error message will store the received arguements previouselement sibling and store it in the variable called P.
 // Then the received arguement's parent will be stored in the varaible called parent.
 // The aruguement received to the function will be an element. The error message will append before this element in the DOM.
 // Then in a conditional statement, it checks if the tagName of P is not a paragraph tag. I.E does this element exist? If not, then create one and append it.
 // If it does exist then ignore.


 function errormessage (refNode){
    const p = refNode.previousElementSibling;
    const parent = refNode.parentNode;
    if(p.tagName !== 'P'){
    const para = document.createElement('p');
    para.textContent = ` There is something wrong. Please provide the correct information.`;
    para.style.fontWeight = '600';
    para.style.color = 'red';
    para.id = 'error';
    parent.insertBefore(para, refNode);
    }

}



// HELPER FUNCTION TO FACTOR REPEATED CODE FOR ZIP AND CVV FUNCTIONS

function evaulauteFieldlength (element, number, parent){
    if( typeof parseInt(element.value) === 'number'){
        if(element.value.length === number ){
            element.style.borderColor = '#5fcf80';
            removeerrorMEssage(parent);
            return true;
        } else{
            element.style.borderColor = 'red';
            return false;
        }
    } 
}

// This closure function will return a inner function that will evailaute the valididity of the arguement passed in the outer function.

// If the text input is not empty and not valid then it will show a tool tip. This is triggered by the showorHideTip function.


function createListener(validator, tipClass) {
    return e => {
      const text = e.target.value;
      const valid = validator(text);
      const showTip = text !== "" && !valid;
      const tooltip = document.querySelector(tipClass);
      showOrHideTip(showTip, tooltip);
    };
  }

  // This is a simple function will will show or hide an element. This function will be mainly used by the createListener function above.

  function showOrHideTip(show, element) {
    // show element when show is true, hide when false
    if (show) {
      element.style.display = "inherit";
    } else {
      element.style.display = "none";
    }
  }


/*****************************************************************************************************************************************
 * 
 * ON LOAD
 * 
 ************/ 

NameInputField.focus();// selects the first input field and adds focus.


/*****************************************************************************************************************************************



/*****************************************************************************************************************************************
 * 
 * JOPB ROLE SELECTION
 * 
 ************/ 

// Revealing text field as user clicks on other. This function uses setTimeout to delay the vibibility of the other input field. It will also have a in and out animation.

jobRoleSelect.addEventListener('change', e =>{

    showOrhideOption(`other`, jobRoleSelect, 'other')

} );



/*****************************************************************************************************************************************
 * 
 * T-SHIRT INFO SECTION
 * 
 ************/ 


// This section will contain instrctions for the T-shirt info section. Actions will be taken before the change event listener begins.

/***
 * 1. This will push all htmlnodes contained in the tShirtSelectionColor variable to the js_puns variable
 */

     for(let i =0; i < tShirtSelectionColor.length;i++){
        if(typeof tShirtSelectionColor[i] !== 'undefined'){
            js_puns.push(tShirtSelectionColor[i]);
            console.log('Js puns', js_puns);
        }
        }

/***** */

/***
 * 2. On load, the children of tShirtSelectionColor will be removed. Each child will be appended again, depending on the value of the design selection element.
 */

    window.onload = (() =>{
        removeAllChildNodes(tShirtSelectionColor); 
        tShirtSelectionColor.prepend( selectedOption('option', 'Please select a T-shirt color', 'disabled', 'selected', 't-shirt_color'));
    });

/***
 
 * 3. The let variable iLoveJs will take the last 3 options from the js_puns variable and store it, therefore dividing the tShirtSelectionColor by 2 and storing them in variables.
 */

    iLoveJs = js_puns.splice(3, 6); // this takes away the last 3 options from the variable above and stores it in this one. 

/***** */

/***
 
 * 4. In this change event, the children of js_puns and iLoveJs will appended to the tShirtSelectionColor node, depending on the value of designSelection selection element.
 */

    designSelection.addEventListener('change', e =>{

        showOrhideOption(`shirt-colors`, designSelection, null, 'select_tshirt_design'); // this function hides or shows the t-shirt color selection. It will get triggered when the user clicks on a t-shirt theme.

            if(designSelection.value === 'js puns' ){ // if the option value of selection is 'js puns', run the following code block. 
                removeAllChildNodes(tShirtSelectionColor); // removes all child nodes before appending begins.
                tShirtSelectionColor.prepend( selectedOption('option', 'Please select a T-shirt theme', 'disabled', 'selected')); // appends disabled option first.
                for(let i =0; i < js_puns.length;i++){ // loops through all 3 options in the js_puns variable
                tShirtSelectionColor.appendChild(js_puns[i]) // appends all options in the js puns variable to the tShirtSelection variable.
                }                                        
            } else {
                removeAllChildNodes(tShirtSelectionColor);  // if the option value of selection is iLoveJs, run the following code block. 
                tShirtSelectionColor.prepend( selectedOption('option', 'Please select a T-shirt theme', 'disabled', 'selected')); // appends disabled option first.
                for(let i =0; i < iLoveJs.length;i++){  // loops through all 3 options in the iLoveJsvariable
                tShirtSelectionColor.appendChild(iLoveJs[i]); // appends all options in the iLoveJs variable to the tShirtSelection variable.
                }
            }

        

    })



/***** */

/***
 
 * 5. In this change event, all checkboxes in the register for acitivties section will be looped over. 
 When a user clicks on a checkbox, events on the same day and time will be disabled, and also a red dot will appear next to the conflicted event.
 */


let total = 0;
activityFieldSet.addEventListener('change', e =>{ // event listener for the activity fieldset element.
    const allCheckboxes = activityFieldSet.querySelectorAll('label input'); // creates a node list of all checkboxes within the acvtivty element
    if(e.target.tagName === 'INPUT'){ // checks is the user has clicked on a checkbox
        
        for(let i =0; i < allCheckboxes.length; i++){ // loops over all checkboxes
        const checkDataType =  allCheckboxes[i].getAttribute('data-day-and-time'); // stores the data type of each iteration of the checkbox
        const checkDataPrice =  parseInt(e.target.getAttribute('data-cost')); // stores the data type of each iteration of the checkbox
        const checkEventType = e.target.getAttribute('data-day-and-time'); // stores the data type of the event (what checkbox the user has clicked on)
        const checkTarget = e.target; // stores the event target

        if(checkTarget === allCheckboxes[i]){
            const p = document.createElement('h3');
            p.className = 'reg-activities-total';

            const parentLength = activityFieldSet.children.length;
            const placement = activityFieldSet.children[parentLength];

            if(checkTarget.checked){
                 p.textContent = `Your total is £${total += checkDataPrice}`;

                if(total > 0){
                    activityFieldSet.insertBefore(p, placement);

                    if(activityFieldSet.contains(p)){
                        const pDOM = document.querySelector('.reg-activities-total');
                            activityFieldSet.removeChild(pDOM);
                            activityFieldSet.insertBefore(p, placement);
                    }
                }


                
            } else {
                const pDOM = document.querySelector('.reg-activities-total');
                p.textContent = `Your total is £${total -= checkDataPrice}`;

                    if (total <= 0){
                        activityFieldSet.removeChild(pDOM); // if total is less then 0 then it will be removed only when uncheked.
                    } else{
                        activityFieldSet.removeChild(pDOM);
                        activityFieldSet.insertBefore(p, placement); // when the value of 0 decreases, the current p element will be removed and updated with a new p element
                    }
            }
            }


        if(checkDataType === checkEventType && checkTarget !== allCheckboxes[i]){ // if the event data type and the checkbox iteration datatype are the same, and if the event checkbox is not equal to the iterated checkbox, run the code.
            const checkboxlabel = allCheckboxes[i].parentNode // grabs the label of conflicted checkboxes
            const div = redAlert(); // stores a red alert div element

                if(checkTarget.checked && checkboxlabel.childElementCount <= 1){ // if the user event has checked and the label has no more then 1 child elements, run the code block.
                    allCheckboxes[i].disabled = true; // disable conflicting checkboxes
                    checkboxlabel.appendChild(div); // append the red alert to indicate the confliction of acitivity
                } 
                else {
                allCheckboxes[i].disabled = false; // once unchecked, enable other conflicting aciticities
                const div = document.querySelector('.conflict-alert'); // stores the red alert div
                checkboxlabel.removeChild(div); // removes red alert div from DOM
                }
        }

        }
    }
})



/***** */




/*****************************************************************************************************************************************
 * 
 * PAYMENT SECTION
 * 
 ************/ 


// is user clicks on a event, a string names total will appear along with the total price of all selected activities.


// "Payment Info" section

//     Display payment sections based on the payment option chosen in the select menu.
//     The "Credit Card" payment option should be selected by default. Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.
//     When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card and “Bitcoin” information should be hidden.
//     When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.

// NOTE: The user should not be able to select the "Select Payment Method" option from the payment select menu, because the user should not be able to submit the form without a chosen payment option.


// on load the paypal and bitcoin sections will have a display value of none.
payPal.style.display = 'none';
bitCoin.style.display = 'none';

// function to hide or show payment sections

function paymentMethod (element1, element2,element3, display1, display2){
element1.style.display = display1;
element2.style.display = display1;
element3.style.display = display2;

}


PaymentSelect.addEventListener('click', e =>{
    for(let i=1; i < PaymentSelect.length; i++){

        if(PaymentSelect.value === 'paypal' && PaymentSelect.value !== PaymentSelect[i]){

            paymentMethod(creditCard, bitCoin, payPal, 'none', 'block');
        }
        else if (PaymentSelect.value === 'bitcoin' && PaymentSelect.value !== PaymentSelect[i]){
       
            paymentMethod(creditCard, payPal, bitCoin, 'none', 'block');            
            
        }
        else{
            paymentMethod(payPal, bitCoin, creditCard, 'none', 'block');   

        }
    }
})

/*****************************************************************************************************************************************
 * 
 * FORM VALIDATION SECTION
 * 
 * 
    // functions to validate different sections of the form
 * 
 ************/ 

    // NAME VALIDATION

    // This function evaluates the length of the input from the user in the name field. If it is more then 0 then we will indicate they have inputted
    // the right details. Also if there was an error message from a previous mistake, this will be removed once the user clicks the submit button.
    // If filled out correctly the function will return true. If not, it will return false.

 function nameValidation (){
    if(NameInputField.value.length > 0 && isValidName(NameInputField.value)){
        NameInputField.style.borderColor = '#5fcf80';
        if(NameInputField.previousElementSibling.tagName === 'P'){
            personalDetails.removeChild(NameInputField.previousElementSibling);
        }
        return true;
    } else {
        NameInputField.style.borderColor = 'red';
        return false;
    }
 }


// regex fopr name input field
function isValidName(username) {
    return /^[A-z ]+$/.test(username);
  }

  // event listener for input field.Look above in the helper section to understand how this closure function works.

NameInputField.addEventListener('input', createListener(isValidName, '.name-tip'));


 // EMAIL VALIDATION

 // Firstly, we have 2 variables which store the index (positioning) of the @ and . symbols of the email address the user has typed in.
 // We then check if the @ symbols position is more then 1, and then . comes after the @ symbol.
 // If so then the function will return true, if not it will return false.

 function emailValidation (){
    const indexofat = MailInputField.value.indexOf('@');
    const indexofdot = MailInputField.value.indexOf('.');

    if(indexofat > 1 && indexofdot > indexofat){
        MailInputField.style.borderColor = '#5fcf80';
        if(MailInputField.previousElementSibling.tagName === 'P'){
            personalDetails.removeChild(MailInputField.previousElementSibling);
        }
        return true;
    } else{
        MailInputField.style.borderColor = 'red';
        return false;
    }
 }

 function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
  }


MailInputField.addEventListener('input', createListener(isValidEmail, '.email-tip'));

 // ACTIVITES VALIDATION

 // This function loops over each of the checkboxes in activities field. If any of the checkboxes are checked then the function
 // will return true. If not it will return false.

function acvtivitiesValidation (){
    for(let i =0;i < activityFieldSetInput.length; i++){
        if(activityFieldSetInput[i].checked){
            activityFieldSet.style.borderColor = '#5fcf80';

            for(let i =0; i < activityFieldSet.children.length; i++){ // REMOVES ERROR MESSSAGE IF IT EXISTS
                if(activityFieldSet.children[i].tagName === 'P'){
                    activityFieldSet.removeChild(activityFieldSet.children[i])
                }
            }

            return true;
        }
    }
    return false;

}

// This function will be called to check indibidual errors in the credit card section.

function creditCarderror (message, parent){
    if(parent.lastElementChild.tagName !== 'SMALL'){
    const small = document.createElement('small');
    small.style.fontSize = '12px';
    small.style.position = 'relative';
    small.style.top = '-15px';
    small.style.color = 'red';
    small.textContent = `Please provide ${message}`;
    parent.appendChild(small);
    }
}

// CREDIT CARD CHECK

// If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, 
// a Zip Code, and a 3 number CVV value before the form can be submitted.
// Credit Card field should only accept a number between 13 and 16 digits.
// The Zip Code field should accept a 5-digit number.
// The CVV should only accept a number that is exactly 3 digits long.

// ERORR MESSAGES AND VALIDATION FOR CVV AND ZI CODE ARE PULLED FROM HELPER FUNCTIONS ABOVE.

// CREDIT CARD NUMBER VALIDATION

// This function will be used by the creditCardVAlidation function if the regex is false.
// Teh function will change the textcontent of teh error message depending on the error.
function ifCreditCardisfalse (cardNumberdiv,text, textReplace, textappend ){
    creditCardNumField.style.borderColor = 'red';
    if(cardNumberdiv.lastElementChild.textContent.endsWith(text)){
        cardNumberdiv.lastElementChild.textContent = (textReplace);
    } else{
    creditCarderror(textappend, cardNumberdiv);
    }
}

// validates the input in the cred card field.
function creditCardValidation (parent){
    const cardNumberdiv = creditCard.querySelector('.col-6'); // credit card container
    const noWordsorSpace = /\D\w*\s*?/; // regex which match a value that contains words and spaces but not numbers
    if(IsvalidcreditNumber(creditCardNumField.value)){ // If the value of the credit card numbers match the IsvalidcreditNumber() regex then run the code
        creditCardNumField.style.borderColor = '#5fcf80';
        if(cardNumberdiv.lastElementChild.tagName === 'SMALL'){
            cardNumberdiv.removeChild(cardNumberdiv.lastElementChild); // removes error message if it exits
        }
        return true;
    }
    else{
        if( noWordsorSpace.test(creditCardNumField.value) ){ // test if the input field contains everything but numbers
            ifCreditCardisfalse(cardNumberdiv, '16.', 'Please provide Numbers only.', 'numbers only.'); // replaced string a different error has occured
            return false;
        }

       else{
            ifCreditCardisfalse(cardNumberdiv, 'only.', 'Please provide Numbers ranging from 13-16.', 'Numbers ranging from 13-16.');// replaced string a different error has occured
            return false;
        }
    }
}

// regex for creditcard validation
function IsvalidcreditNumber (number)  {  
    return /\b(?:\d[ -]*?){13,16}\b/.test(number); // This regex will return true if numbers are between 13 and 16 digitsl long
}

creditCardNumField.addEventListener('input', createListener(IsvalidcreditNumber, '.cred-num-tip'));

// reformats telephone number once validated

creditCardNumField.addEventListener('blur', e =>{
    e.target.value = formatTelephone(e.target.value);
});

// 
function formatTelephone (number){
const regex = /^\D*(\d{4})\D*(\d{4})\D*(\d{4})\D*(\d{1,4})*$/
return number.replace(regex, '$1-$2-$3-$4');
}


// EVENT LISTENERS FOR VALIDATION

// The validation functions are called when the submit button is clicked on the form.
// Since the validation functions either return true or false, if any of the validation functions are false it will prevent from the form being submitted.


form.addEventListener('submit', e =>{
    nameValidation();
    emailValidation();
    acvtivitiesValidation();
    creditCardValidation(paymentField);

    if(!nameValidation()){
        e.preventDefault();
        errormessage(NameInputField);
    }
    
    if(!emailValidation()){
        e.preventDefault();
        errormessage(MailInputField);
    }

    if(!acvtivitiesValidation()){
        e.preventDefault();
        errormessage(activityFieldSet.lastElementChild);

     }

     if(!creditCardValidation(paymentField)){
        e.preventDefault();
        errormessage(paymentField.lastElementChild);
     }

     if(!evaulauteFieldlength(zipCode, 5, paymentField)){ //FUNCTION TO EVALUATE ZIPCODE
        e.preventDefault();
        errormessage(paymentField.lastElementChild);
     }

     if(!evaulauteFieldlength(cvv, 3, paymentField)){ //FUNCTION TO EVALUATE CVV
        e.preventDefault();
        errormessage(paymentField.lastElementChild);
        
     }
})
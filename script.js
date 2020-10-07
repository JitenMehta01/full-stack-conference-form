/*****************************************************************************************************************************************
 * 
 * VARIABLES
 * 
 ************/ 

const firstInputText = document.querySelector('input[type=text]');

const jobRoleSelect = document.querySelector('#title');
const tShirtSelectionColor = document.querySelector('#color');  
const activityFieldSet = document.querySelector('.activities');  

const js_puns = []; // All t-shirt colour options will be pushed to this array.
let iLoveJs; // All iloveJs colour tshirts will be spliced from js_puns and pushed into this variable.

const designSelection = document.querySelector('#design');  




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


// This function will hide and show html nodes. This function is used in 2 placed so far.
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



/*****************************************************************************************************************************************
 * 
 * ON LOAD
 * 
 ************/ 

firstInputText.focus();// selects the first input field and adds focus.


   

/*****************************************************************************************************************************************
 * 
 * JOPB ROLE SELECTION
 * 
 ************/ 

// Revealing text field is user clicks on other. This function uses setTimeout to delay the vibibility of the other input field. It will also have a in and out animation.

jobRoleSelect.addEventListener('change', e =>{

    showOrhideOption(`other`, jobRoleSelect, 'other')

});



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
 
 * 5. In this change event, the children of js_puns and iLoveJs will appended to the tShirtSelectionColor node, depending on the value of designSelection selection element.
 */

// check if the event is a checkbox
// loop over all checkboxes
// store all checkboxes in a var
// store all e.target data types in a var
// store the event.target in a var
// compare if the event data type and iteration data type is the same. Also check if what the user has clicked on is not the same as each iteration of checkboxes

activityFieldSet.addEventListener('change', e =>{ // event listener for the activity fieldset element.
    const allCheckboxes = activityFieldSet.querySelectorAll('label input'); // creates a node list of all checkboxes within the acvtivty element
    if(e.target.tagName === 'INPUT'){ // checks is the user has clicked on a checkbox
        
        for(let i =0; i < allCheckboxes.length; i++){ // loops over all checkboxes
        const checkDataType =  allCheckboxes[i].getAttribute('data-day-and-time'); // stores the data type of each iteration of the checkbox
        const checkEventType = e.target.getAttribute('data-day-and-time'); // stores the data type of the event (what checkbox the user has clicked on)
        const checkTarget = e.target; // stores the event target

        if(checkDataType === checkEventType && checkTarget !== allCheckboxes[i]){ // if the event data type and the checkbox iteration datatype are the same, and if the event checkbox is not equal to the iterated checkbox, run the code.
            const checkboxlabel = allCheckboxes[i].parentNode // grabs the label of conficted checkboxes
            const div = redAlert(); // stores a red alert div element

                if(checkTarget.checked && checkboxlabel.childElementCount <= 1){ // if the user event is checked and the label has no more then 1 child elements, run the code block.
                    allCheckboxes[i].disabled = true; // disable conflicting checkboxes
                        checkboxlabel.appendChild(div); // append the red alert to indicate the confliction of aciticity
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








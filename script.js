/*****************************************************************************************************************************************
 * 
 * VA\RIABLES
 * 
 ************/ 

const firstInputText = document.querySelector('input[type=text]');
const other = document.querySelector('#other');

const jobRoleSelect = document.querySelector('#title');
const tShirtSelectionColor = document.querySelector('#color');  

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
 * This function will take a container, and whilst it has 1 or more child elements, they will all be removed.
 */ 



 function selectedOption (element, textContent, disabled, selected) {
    const option = document.createElement(element);
    option.textContent = textContent;
    const disable = document.createAttribute(disabled);
    const select = document.createAttribute(selected);
    option.setAttributeNode(disable);
    option.setAttributeNode(select);
   
    return option;
 }



/*****************************************************************************************************************************************
 * 
 * ON LOAD
 * 
 ************/ 

firstInputText.focus();// selects the first input field and adds focus.

// Hiding the other text field on load
other.style.display = 'none';
other.style.position = 'relative';
other.style.transition = 'all .3s ease-in';
other.style.opacity = '0';
other.style.top = '20px';


   

/*****************************************************************************************************************************************
 * 
 * JOPB ROLE SELECTION
 * 
 ************/ 

// Revealing text field is user clicks on other

jobRoleSelect.addEventListener('change', e =>{
    if(jobRoleSelect.value === 'other'){
        other.style.display = 'block';
        window.setTimeout(() => {
            other.style.opacity = '1';
            other.style.top = '0px';
        }, 100);

    } else if(jobRoleSelect.value !== 'Other'){
            other.style.opacity = '0';
            other.style.top = '40px';
            window.setTimeout(() =>{
                other.style.display = 'none';
            }, 400)
    }
})

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
            console.log(js_puns)
        }
        }

/***** */

/***
 * 2. On load, the children of tShirtSelectionColor will be removed. Each child will be appended again, depending on the value of the design selection element.
 */

    window.onload = (() =>{
        removeAllChildNodes(tShirtSelectionColor); 
        tShirtSelectionColor.prepend( selectedOption('option', 'Please select a T-shirt theme', 'disabled', 'selected'));
    });

/***
 
 * 3. The let variable iLoveJs will take the last 3 options from the js_puns variable and store it, therefore dividing the tShirtSelectionColor by 2 and storing them in variables.
 */

    iLoveJs = js_puns.splice(3, 6); // this takes away the last 3 options from the variable above and stores it in this one. Each now have 3

/***** */

/***
 
 * 4. In this change event, the children of js_puns and iLoveJs will appended to the tShirtSelectionColor node, depending on the value of designSelection selection element.
 */

    designSelection.addEventListener('change', e =>{

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


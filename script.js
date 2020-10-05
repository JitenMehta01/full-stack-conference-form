/*****************************************************************************************************************************************
 * 
 * VARIABLES
 * 
 ************/ 

const firstInputText = document.querySelector('input[type=text]');

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
 
function elementAnimation (element) {
    window.setTimeout(() => {
        element.style.opacity = '1';
        element.style.top = '0px';
    }, 100);

}

/***
 * 
 * This function will add a setTimeout animation to a whatever arguement is passed.
 */ 

function elementAnimation (element) {
    window.setTimeout(() => {
        element.style.opacity = '1';
        element.style.top = '0px';
    }, 100);
}


// This function will hide and show html nodes. This function is used in 2 placed so far.
// It is called when the user clicks on the t-shirt theme selection element. 
// It is also called when the user clicks on the on the other option when the job selected element is clicked.
// This function initally hides the element, and then animates in when the respective element is triggered, and hides when another option is clicked.

 function showOrhideOption (element,selection,optionValue, isNotvalue) {
    const node = document.querySelector(`#${element}`);
    if(selection.value === optionValue) {
        node.style.display = 'block';
        elementAnimation(node);
    } else if(selection.value !== isNotvalue && optionValue === null){
        node.style.display = 'block';
        console.log(node);
        elementAnimation(node);
    }
    else {
        node.style.opacity = '0';
        node.style.top = '40px';
        window.setTimeout(() =>{
            node.style.display = 'none';
        }, 400)
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


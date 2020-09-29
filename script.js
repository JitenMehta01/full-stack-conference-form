/*****************************************************************************************************************************************
 * 
 * VA\RIABLES
 * 
 ************/ 

const firstInputText = document.querySelector('input[type=text]');
const other = document.querySelector('#other');

const jobRoleSelect = document.querySelector('#title');
const tShirtSelection = document.querySelector('#color');  
let tShirtSelectionNodes = []; 

const designSelection = document.querySelector('#design');  



/*****************************************************************************************************************************************
 * 
 * FUNCTIONS
 * 
 ************/ 
/***
 * 
 * This function will take a container, and whilst it has 1 or more child elements, they will all be removed.
 */

function removeAllChildNodes(parent) {
    for(let i =0; i < tShirtSelection.length;i++){
        if(typeof tShirtSelection[i] !== 'undefined'){
            tShirtSelectionNodes.push(tShirtSelection[i]);
        }

    }
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

// adding a choose here option for the job role seletion element
window.onload = (() =>{

    jobRoleSelect.prepend( selectedOption('option', 'Choose here', 'disabled', 'selected'));

    tShirt();
})

// Removed all options in the color selection element and preappends on option element.

 function tShirt (){
    removeAllChildNodes(tShirtSelection);
    tShirtSelection.prepend( selectedOption('option', 'Please select a T-shirt theme', 'disabled', 'selected'));
   }
   

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

 // remove all option items from select element
 // append one option to the selection element
 // set the options textcontent to = 'Please select a T-shirt theme'.
 // Then create an if statement
 // In the if statement loop over all design nodes
 // if the value of the selection element is not select theme, append nodes to the color selection



    designSelection.addEventListener('change', e =>{
        if(designSelection.value !== 'select theme'){



            const js_puns = tShirtSelectionNodes;
            const iLoveJs = js_puns.splice(3, 6);
            console.log(js_puns);
            console.log(iLoveJs);

            if(designSelection.value === 'js puns'){
                for(let i =0; i < js_puns.length;i++){
                removeAllChildNodes(tShirtSelection);
                tShirtSelection.appendChild(js_puns[i])
                }
            } else {
                for(let i =0; i < iLoveJs.length;i++){
                removeAllChildNodes(tShirtSelection);
                tShirtSelection.appendChild(iLoveJs[i]);
                }
            }

        
            } 
    })






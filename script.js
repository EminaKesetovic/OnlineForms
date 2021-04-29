const FORM_ELEMENT_DIV_CLASS = "new_form_elements";
const FORM_ELEMENT_DIV_ID = "form_element";

const INPUT_NAME = "form_element_type";
const INPUT_ID = "label_name";
const INPUT_LABEL = "Element";
const INPUT_VALUE = "New label";

const RADIOBUTTON_OPTION = "radiobutton";
const RADIOBUTTON_NUMBER_INPUT_NAME = "form_number_options";
const RADIOBUTTON_NUMBER_INPUT_ID = "number_option";
const RADIOBUTTON_OPTION_INPUT_NAME = "form_radiobutton_option";
const RADIOBUTTON_OPTION_INPUT_ID = "radiobutton_option";
const RADIOBUTTON_OPTION_LABEL = "Option";
const RADIOBUTTON_OPTION_DIV_CLASS = "form_radiobutton_options";
const RADIOBUTTON_OPTION_DIV_ID = "radiobutton_option";


const FET_SELECTBOX_NAME = "form_element_type";
const FET_SELECTBOX_ID = "element_type";
const FET_SELECTBOX_OPTIONS = {"textbox":"TextBox", "checkbox":"CheckBox"};
FET_SELECTBOX_OPTIONS[RADIOBUTTON_OPTION] = "RadioButton";

const FVT_SELECTBOX_NAME = "form_validation_type";
const FVT_SELECTBOX_ID = "validation_type";
const FVT_SELECTBOX_OPTIONS = {"none":"None", "mandatory":"Mandatory", "numeric":"Numeric"};

const BUTTON_ID = "add_form_element";
const BUTTON_TEXT = "Add";

const DIV_INSTANCE_ATTRIBUTE = "instance";

const RADIOBUTTON_MIN_VALUE = 2;

const RADIOBUTTON_INPUT_ATTRIBUTES = {"min":RADIOBUTTON_MIN_VALUE};


function shuffleTabs(tabIdToShow) {
	var tabContentShow;
	var i, tabs;
	
	tabs = document.getElementsByClassName("tab_content");

	for (i=0; i<tabs.length; i++) {
		tabs[i].style.display = "none";
	}

	tabContentShow = document.getElementById(tabIdToShow);
	tabContentShow.style.display = "block";
}

function createNewInput(instance, inputType, inputName, inputId, inputValue, inputAttributes = null) {
	var newInput;	

	newInput = document.createElement("input");	
	
	newInput.type = inputType;
	newInput.name = inputName + '_' + instance;
	newInput.id = inputId + '_' + instance;
	if (inputValue != null) {
		newInput.value = inputValue;
	}	

	if (inputAttributes) {
		for (const key in inputAttributes) {
			//One problem in using the for...in method is that it loops through the properties in the prototype chain as well. Since the objects in JavaScript can inherit properties from their prototypes, the for...in statement will loop through those properties as well.
			if (inputAttributes.hasOwnProperty(key)) {
				newInput.setAttribute(`${key}`, `${inputAttributes[key]}`)
			}
		}
	}

	return newInput;
}

function createNewLabel(instance, inputId, inputLabel) {
	var newInputLabel;

	newInputLabel = document.createElement("Label");
	newInputLabel.setAttribute("for", inputId + '_' + instance);
	newInputLabel.innerHTML = inputLabel + instance;

	return newInputLabel;
}

function createNewSelectBox(instance, selectBoxName, selectBoxId, selectBoxOptions) {
	var newSelectBox, option, i;

	newSelectBox = document.createElement("select");
	newSelectBox.name = selectBoxName + '_' + instance;
	newSelectBox.id = selectBoxId + '_' + instance;

	for (const key in selectBoxOptions) {			
		if (selectBoxOptions.hasOwnProperty(key)) {
			option = document.createElement("option");
			option.value = `${key}`;
			option.text = `${selectBoxOptions[key]}`;
			newSelectBox.appendChild(option);			
		}
	}

	return newSelectBox;
}

function createNewButton(buttonId, buttonText) {
	var newButton;

	newButton = document.createElement("button");
	newButton.id = buttonId;
	newButton.textContent = buttonText;	

	return newButton;
}

function createNewDiv(instance, divId, divClass, divAttributes = null) {
	var newDiv; 

	newDiv = document.createElement("div");
	newDiv.id = divId + '_' + instance;
	newDiv.className = divClass;

	if (divAttributes) {
		for (const key in divAttributes) {			
			if (divAttributes.hasOwnProperty(key)) {
				newDiv.setAttribute(`${key}`, `${divAttributes[key]}`)
			}
		}
	}	

	return newDiv;
}

function createFormElement() {
	var newDiv, newFormLabelName, newFormElementType, newFormValidationType, newAddButton, instance, divAttributes = {};
	
	instance = document.querySelectorAll("." + FORM_ELEMENT_DIV_CLASS).length + 1;
	
	divAttributes[DIV_INSTANCE_ATTRIBUTE] = instance;

	newDiv = createNewDiv(instance, FORM_ELEMENT_DIV_ID, FORM_ELEMENT_DIV_CLASS, divAttributes);

	formLabel = createNewLabel(instance, INPUT_ID, INPUT_LABEL);

	newFormLabelName = createNewInput(instance, "text", INPUT_NAME, INPUT_ID, INPUT_VALUE);

	newFormElementType = createNewSelectBox(instance, FET_SELECTBOX_NAME, FET_SELECTBOX_ID, FET_SELECTBOX_OPTIONS);	

	newFormValidationType = createNewSelectBox(instance, FVT_SELECTBOX_NAME, FVT_SELECTBOX_ID, FVT_SELECTBOX_OPTIONS);

	newAddButton = createNewButton(BUTTON_ID, BUTTON_TEXT);	
	
	newDiv.appendChild(formLabel);
	newDiv.appendChild(newFormLabelName);
	newDiv.appendChild(newFormElementType);
	newDiv.appendChild(newFormValidationType);
	newDiv.appendChild(newAddButton);

	return newDiv;
}

function removeRadioButtonOptions(radioButtonOptionsDivs) {
	//Its not working with foor loop and remove() option??
	while(radioButtonOptionsDivs.length > 0){
		radioButtonOptionsDivs[0].parentNode.removeChild(radioButtonOptionsDivs[0]);
	}
}

function addRadioButtonOptions(nubmerOfRadioButtonOptions, divInstance, parentDiv, oldRadioButtonOptionNames) {
	for (var i=0; i<nubmerOfRadioButtonOptions; i++) {		
		var newRadioButtonDiv, newRadioButtonLabel, newRadioButtonInput;

		newRadioButtonDiv = createNewDiv(i+1, RADIOBUTTON_OPTION_DIV_ID + '_' + divInstance, RADIOBUTTON_OPTION_DIV_CLASS + '_' + divInstance);

		newRadioButtonLabel = createNewLabel(i+1, RADIOBUTTON_OPTION_INPUT_ID + '_' + divInstance, RADIOBUTTON_OPTION_LABEL);
		newRadioButtonInput = createNewInput(i+1, "text", RADIOBUTTON_OPTION_INPUT_NAME + '_' + divInstance, RADIOBUTTON_OPTION_INPUT_ID + '_' + divInstance, oldRadioButtonOptionNames[i]);
		
		newRadioButtonDiv.appendChild(newRadioButtonLabel);
		newRadioButtonDiv.appendChild(newRadioButtonInput);
		parentDiv.appendChild(newRadioButtonDiv);
	}
}

function addRadioButtonOptionsCreation(e) {
	var divInstance, radioButtonInput, radioButtonOptionsDivs, parentDiv;

	parentDiv = e.target.parentElement;

	divInstance = parentDiv.getAttribute(DIV_INSTANCE_ATTRIBUTE);
	
	if (e.target && e.target.id == FET_SELECTBOX_ID + '_' + divInstance) {
		radioButtonInput = document.getElementById(RADIOBUTTON_NUMBER_INPUT_ID + '_' + divInstance);
		radioButtonOptionsDivs = document.getElementsByClassName(RADIOBUTTON_OPTION_DIV_CLASS + '_' + divInstance);

		removeRadioButtonOptions(radioButtonOptionsDivs);

		if (radioButtonInput) {
			radioButtonInput.remove();			
		}

		if (e.target.value == RADIOBUTTON_OPTION) {
			var newNumberRadioButtonOptions;

			newNumberRadioButtonOptions = createNewInput(divInstance, "number", RADIOBUTTON_NUMBER_INPUT_NAME, RADIOBUTTON_NUMBER_INPUT_ID, RADIOBUTTON_MIN_VALUE, RADIOBUTTON_INPUT_ATTRIBUTES);
					
			e.target.parentNode.insertBefore(newNumberRadioButtonOptions, e.target.nextSibling);

			addRadioButtonOptions(RADIOBUTTON_MIN_VALUE, divInstance, parentDiv, []);			
		}	
	}

	if (e.target && e.target.id == RADIOBUTTON_NUMBER_INPUT_ID + '_' + divInstance) {
		var oldRadioButtonOptionNames = [];
		var nubmerOfRadioButtonOptions;

		nubmerOfRadioButtonOptions = e.target.value;
		
		radioButtonOptionsDivs = document.getElementsByClassName(RADIOBUTTON_OPTION_DIV_CLASS + '_' + divInstance);

		for (var i=0; i<radioButtonOptionsDivs.length; i++) {
			oldRadioButtonOptionNames.push(radioButtonOptionsDivs[i].lastChild.value);
		}

		removeRadioButtonOptions(radioButtonOptionsDivs);

		addRadioButtonOptions(nubmerOfRadioButtonOptions, divInstance, parentDiv, oldRadioButtonOptionNames);		
	}
}

function addNewFormElement(e, divIdContent) {
	var addButton, divToAppend, divContent;	

	divContent = document.getElementById(divIdContent);
		
	if (e.target && e.target.id == BUTTON_ID) {
		addButton = document.getElementById(BUTTON_ID);
		
		if (addButton) {
			addButton.remove();			
		}

		divToAppend = createFormElement();

		divContent.appendChild(divToAppend);	
	}
}


function searchForms(searchFieldId, divIdContent) {	
	var searchText;
	var divToAppend, divContent;

	divContent = document.getElementById(divIdContent);

	divContent.innerHTML = "";	

	searchText = document.getElementById(searchFieldId).value;
	
	if (!searchText) {
		divToAppend = createFormElement();

		divContent.appendChild(divToAppend);
	}
}


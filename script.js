const FORM_ELEMENT_DIV_CLASS = "new_form_elements";
const FORM_ELEMENT_DIV_ID = "form_element";
const DIV_INSTANCE_ATTRIBUTE = "instance";

const ONE_ATTRIBUTE_TO_RULE_THEM_ALL = "the_one";
const LABEL_ATTRIBUTE = "label";
const TYPE_ATTRIBUTE = "type";
const VALIDATION_ATTRIBUTE = "validation";
const RADIOBUTTON_ATTRIBUTE = "option";
const RADIOBUTTON_NUMBER_ATTRIBUTE = "radiobutton_number";

const INPUT_NAME = "form_element_type";
const INPUT_ID = "label_name";
const INPUT_LABEL = "Element";
const INPUT_VALUE = "New label";
const INPUT_ATTRIBUTES = {};
INPUT_ATTRIBUTES[ONE_ATTRIBUTE_TO_RULE_THEM_ALL] = LABEL_ATTRIBUTE;

const RADIOBUTTON_OPTION = "radiobutton";
const RADIOBUTTON_NUMBER_INPUT_NAME = "form_number_options";
const RADIOBUTTON_NUMBER_INPUT_ID = "number_option";
const RADIOBUTTON_OPTION_INPUT_NAME = "form_radiobutton_option";
const RADIOBUTTON_OPTION_INPUT_ID = "radiobutton_option";
const RADIOBUTTON_OPTION_LABEL = "Option";
const RADIOBUTTON_OPTION_DIV_CLASS = "form_radiobutton_options";
const RADIOBUTTON_OPTION_DIV_ID = "radiobutton_option";
const RADIOBUTTON_OPTION_ATTRIBUTES = {};
RADIOBUTTON_OPTION_ATTRIBUTES[ONE_ATTRIBUTE_TO_RULE_THEM_ALL] = RADIOBUTTON_ATTRIBUTE;

const FET_SELECTBOX_NAME = "form_element_type";
const FET_SELECTBOX_ID = "element_type";
const FET_SELECTBOX_OPTIONS = {"textbox":"TextBox", "checkbox":"CheckBox"};
FET_SELECTBOX_OPTIONS[RADIOBUTTON_OPTION] = "RadioButton";
const FET_SELECTBOX_ATTRIBUTES = {};
FET_SELECTBOX_ATTRIBUTES[ONE_ATTRIBUTE_TO_RULE_THEM_ALL] = TYPE_ATTRIBUTE;

const FVT_SELECTBOX_NAME = "form_validation_type";
const FVT_SELECTBOX_ID = "validation_type";
const FVT_SELECTBOX_OPTIONS = {"none":"None", "mandatory":"Mandatory", "numeric":"Numeric"};
const FVT_SELECTBOX_ATTRIBUTES = {};
FVT_SELECTBOX_ATTRIBUTES[ONE_ATTRIBUTE_TO_RULE_THEM_ALL] = VALIDATION_ATTRIBUTE;

const BUTTON_ID = "add_form_element";
const BUTTON_TEXT = "Add";

const RADIOBUTTON_MIN_VALUE = 2;
const RADIOBUTTON_NUMBER_ATTRIBUTES = {"min":RADIOBUTTON_MIN_VALUE};
RADIOBUTTON_NUMBER_ATTRIBUTES[ONE_ATTRIBUTE_TO_RULE_THEM_ALL] = RADIOBUTTON_NUMBER_ATTRIBUTE;

const DB_NAME = "online_forms";
const FORMS_TABLE = "forms";
const FORMS_TABLE_KEY = "name";
const ELEMENTS_TABLE = "elements";
const ELEMENTS_TABLE_INDEX = "form_name";
const ELEMENTS_TABLE_KEY = "id";
const VERSION = 1;


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

function createNewSelectBox(instance, selectBoxName, selectBoxId, selectBoxOptions, selectBoxAttributes = null) {
	var newSelectBox, option, i;

	newSelectBox = document.createElement("select");
	newSelectBox.name = selectBoxName + '_' + instance;
	newSelectBox.id = selectBoxId + '_' + instance;

	if (selectBoxAttributes) {
		for (const key in selectBoxAttributes) {			
			if (selectBoxAttributes.hasOwnProperty(key)) {
				newSelectBox.setAttribute(`${key}`, `${selectBoxAttributes[key]}`);
			}
		}
	}

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

	newFormLabelName = createNewInput(instance, "text", INPUT_NAME, INPUT_ID, INPUT_VALUE, INPUT_ATTRIBUTES);

	newFormElementType = createNewSelectBox(instance, FET_SELECTBOX_NAME, FET_SELECTBOX_ID, FET_SELECTBOX_OPTIONS, FET_SELECTBOX_ATTRIBUTES);	

	newFormValidationType = createNewSelectBox(instance, FVT_SELECTBOX_NAME, FVT_SELECTBOX_ID, FVT_SELECTBOX_OPTIONS, FVT_SELECTBOX_ATTRIBUTES);

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
		var newRadioButtonDiv, newRadioButtonLabel, newRadioButtonInput, divAttributes = {};

		divAttributes[DIV_INSTANCE_ATTRIBUTE] = i+1;

		newRadioButtonDiv = createNewDiv(i+1, RADIOBUTTON_OPTION_DIV_ID + '_' + divInstance, RADIOBUTTON_OPTION_DIV_CLASS + '_' + divInstance, divAttributes);

		newRadioButtonLabel = createNewLabel(i+1, RADIOBUTTON_OPTION_INPUT_ID + '_' + divInstance, RADIOBUTTON_OPTION_LABEL);
		newRadioButtonInput = createNewInput(i+1, "text", RADIOBUTTON_OPTION_INPUT_NAME + '_' + divInstance, RADIOBUTTON_OPTION_INPUT_ID + '_' + divInstance, oldRadioButtonOptionNames[i], RADIOBUTTON_OPTION_ATTRIBUTES);
		
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

			newNumberRadioButtonOptions = createNewInput(divInstance, "number", RADIOBUTTON_NUMBER_INPUT_NAME, RADIOBUTTON_NUMBER_INPUT_ID, RADIOBUTTON_MIN_VALUE, RADIOBUTTON_NUMBER_ATTRIBUTES);
					
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

function addNewFormElement(e, formIdContent) {
	var addButton, divToAppend, formContent;	

	formContent = document.getElementById(formIdContent);
		
	if (e.target && e.target.id == BUTTON_ID) {
		addButton = document.getElementById(BUTTON_ID);
		
		if (addButton) {
			addButton.remove();			
		}

		divToAppend = createFormElement();

		formContent.appendChild(divToAppend);	
	}
}

function searchDatabaseForForms(formName) {
	const request = indexedDB.open(DB_NAME, VERSION);

	request.onsuccess = function(e) {
		console.log("Successfully opened the database"); 
		const db = e.target.result;
		
		const transaction = db.transaction([FORMS_TABLE, ELEMENTS_TABLE], 'readonly');

		const formsStore = transaction.objectStore(FORMS_TABLE);
		const elementsStore = transaction.objectStore(ELEMENTS_TABLE);

		const form = formsStore.get(formName)
		
		form.onsuccess = function(e){
			console.log(e.target.result);
		}
		
		form.onerror = function(e){
			console.log("Error:", e.target.error.message);
		}

		// Clean up: close connection
		form.oncomplete = () => {
			console.log("Closed the database");
			db.close();
		};
	}
	request.onerror = function(e) { 
		console.log("Error:", e.target.error.message); 
	}
}


function searchForms(searchFieldId, formIdContent, submitButtonId) {	
	var searchText;
	var divToAppend, formContent, submitButton;

	formContent = document.getElementById(formIdContent);

	formContent.innerHTML = "";	

	searchText = document.getElementById(searchFieldId).value;
	
	if (!searchText) {
		divToAppend = createFormElement();

		formContent.appendChild(divToAppend);
	} else {
		searchDatabaseForForms(searchText);
	}

	submitButton = document.getElementById(submitButtonId);

	submitButton.style.display = "block";
}

function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}

function validateAndSaveForm(e, searchFieldId) {
	e.preventDefault();

	var formElements;

	var elements = [];

	var flag = 1;

	var formNameElement = document.getElementById(searchFieldId);
	var formName = formNameElement.value;

	var inputs = e.target.getElementsByTagName("input");
	
	for (var i=0; i<inputs.length; i++) {
		if (!inputs[i].value) {
			inputs[i].focus();
			flag = 0;
			alert("Please fill all the inputs");
			break;
		}
	}
	
	if (formName === "") {
		formNameElement.focus();
		flag = 0;
		alert("Please add a form name");		
	}

	if (flag) {
		formElements = e.target.querySelectorAll("[" + ONE_ATTRIBUTE_TO_RULE_THEM_ALL + "]");
	
		for (var i=0; i<formElements.length; i++) {
			var newObject = {};

			var elementDivInstance = formElements[i].parentNode.getAttribute(DIV_INSTANCE_ATTRIBUTE);

			var optionsDivInstance = null;

			var raddioButtonOption = 0;

			if (formElements[i].getAttribute(ONE_ATTRIBUTE_TO_RULE_THEM_ALL) == RADIOBUTTON_ATTRIBUTE) {
				optionsDivInstance = formElements[i].parentNode.getAttribute(DIV_INSTANCE_ATTRIBUTE);
				elementDivInstance = formElements[i].parentNode.parentNode.getAttribute(DIV_INSTANCE_ATTRIBUTE);
				raddioButtonOption = 1;
			}
			
			newObject[ELEMENTS_TABLE_INDEX] = formName;
			newObject['instance'] = elementDivInstance;
			newObject['radio_button_div_instance'] = optionsDivInstance;
			newObject['radio_button_option'] = raddioButtonOption;
			newObject['node'] = formElements[i].nodeName;
			newObject[ELEMENTS_TABLE_KEY] = uuidv4();
			newObject['type'] = formElements[i].getAttribute(ONE_ATTRIBUTE_TO_RULE_THEM_ALL);		
			newObject['value'] = formElements[i].value;					
			
			elements.push(newObject);
		}

		saveAdministrationForm(formName, elements);
	}
}

function saveAdministrationForm(formName, formElements) {
	const request = indexedDB.open(DB_NAME, VERSION);

	request.onsuccess = function(e) {
		console.log("Successfully opened the database"); 
		const db = e.target.result;
		
		const transaction = db.transaction([FORMS_TABLE, ELEMENTS_TABLE], 'readwrite');

		const formsStore = transaction.objectStore(FORMS_TABLE);
		const elementsStore = transaction.objectStore(ELEMENTS_TABLE);

		var formsObject = {};
		formsObject[FORMS_TABLE_KEY] = formName;

		formsStore.add(formsObject);
			
		for (var i=0; i<formElements.length; i++) {
			elementsStore.add(formElements[i]);
		}
		
		transaction.onsuccess = function(e){
			console.log("Saved the data!");
		}
		
		transaction.onerror = function(e){
			console.log("Error:", e.target.error.message);
		}

		// Clean up: close connection
		transaction.oncomplete = () => {
			console.log("Closed the database");
			db.close();
		};
	}
	request.onerror = function(e) { 
		console.log("Error:", e.target.error.message); 
	}
}

function setDB() {

	let objectStore = null;

	if (!indexedDB) {
		alert("Your browser doesn't support a stable version of IndexedDB.");
	}

	const request = indexedDB.open(DB_NAME, VERSION);

	request.onerror = function(event) {
		console.log("Error:", event.target.error.message);
	};

	request.onsuccess = function(event) {		
		console.log("Successfuly accesed the DB!");		
	};

	request.onupgradeneeded = function(event){
		console.log("Created new database");
		const db = event.target.result;		
				
		// check if there is a table with given name
		if (!db.objectStoreNames.contains(FORMS_TABLE)) {
			objectStore = db.createObjectStore(FORMS_TABLE, { autoIncrement: true, keyPath: FORMS_TABLE_KEY});
		};

		// check if there is a table with given name
		if (!db.objectStoreNames.contains(ELEMENTS_TABLE)) {
			objectStore = db.createObjectStore(ELEMENTS_TABLE, { autoIncrement: true, keyPath: ELEMENTS_TABLE_KEY});

			objectStore.createIndex(ELEMENTS_TABLE_INDEX, ELEMENTS_TABLE_INDEX, {unique: false});
		};

	};
}


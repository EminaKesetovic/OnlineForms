
/**
* Shuffle between tabs
*
* @param    {String} tabIdToShow         The tab id to be displayed
* @param    {String} contentClassName    Class of the tabs that needs to be hidden 
*/
function shuffleTabs(tabIdToShow, contentClassName) {
	var tabContentShow;
	var i, tabs;
	
	tabs = document.getElementsByClassName(contentClassName);

	for (i=0; i<tabs.length; i++) {
		tabs[i].style.display = "none";			
	}

	tabContentShow = document.getElementById(tabIdToShow);
	tabContentShow.style.display = "block";
}


function createAdminFormElement(showAddButton, element = null) {
	var newDiv, newFormLabelName, newFormElementType, newFormValidationType, newAddButton, instance, divAttributes = {};

	instance = document.querySelectorAll("." + FORM_ELEMENT_DIV_CLASS).length + 1;
	
	divAttributes[DIV_INSTANCE_ATTRIBUTE] = instance;

	var inputValue = INPUT_VALUE;
	var SBtypeValue = "";
	var SBvalidationValue = "";
	var elementOptions = [];

	if (element) {
		divAttributes[DIV_IDB_ATTRIBUTE] = element.id;
		inputValue = element.label;
		SBtypeValue = element.type;
		SBvalidationValue = element.validation;
		elementOptions = element.options;
		elementOptions.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
	}

	newDiv = createNewDiv(instance, FORM_ELEMENT_DIV_ID, FORM_ELEMENT_DIV_CLASS, divAttributes);

	formLabel = createNewLabel(instance, INPUT_ID, INPUT_LABEL);

	newFormLabelName = createNewInput(instance, "text", INPUT_NAME, INPUT_ID, inputValue, INPUT_ATTRIBUTES);

	newFormElementType = createNewSelectBox(instance, FET_SELECTBOX_NAME, FET_SELECTBOX_ID, FET_SELECTBOX_OPTIONS, SBtypeValue, FET_SELECTBOX_ATTRIBUTES);	

	newFormValidationType = createNewSelectBox(instance, FVT_SELECTBOX_NAME, FVT_SELECTBOX_ID, FVT_SELECTBOX_OPTIONS, SBvalidationValue, FVT_SELECTBOX_ATTRIBUTES);

	newDiv.appendChild(formLabel);
	newDiv.appendChild(newFormLabelName);
	newDiv.appendChild(newFormElementType);

	if (elementOptions.length !== 0) {
		newNumberRadioButtonOptions = createNewInput(instance, "number", RADIOBUTTON_NUMBER_INPUT_NAME, RADIOBUTTON_NUMBER_INPUT_ID, elementOptions.length, RADIOBUTTON_NUMBER_ATTRIBUTES);
		newDiv.appendChild(newNumberRadioButtonOptions);
	}
	
	newDiv.appendChild(newFormValidationType);

	if (showAddButton) {
		newAddButton = createNewButton(BUTTON_ID, BUTTON_TEXT);	
		newDiv.appendChild(newAddButton);
	}

	if (elementOptions.length !== 0) {
		var radioButtonOptionNames = [];
		
		for (var i=0; i<elementOptions.length; i++) {
			radioButtonOptionNames.push(elementOptions[i].radiobutton);
		}
		addRadioButtonOptions(element.options.length, instance, newDiv, radioButtonOptionNames);
	}

	return newDiv;
}

function createFormsFormElement(element) {
	
	var newDiv, newFormLabel, newFormElement, instance, divAttributes = {};	
	
	instance = document.querySelectorAll("." + FORM_ELEMENT_DIV_CLASS).length + 1;

	var label = element.label;
	var type = element.type;
	var elementOptions = element.options;
	elementOptions.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
	
	divAttributes[DIV_INSTANCE_ATTRIBUTE] = instance;
	divAttributes[DIV_IDB_ATTRIBUTE] = element.id;
	divAttributes[VALIDATION_ATTRIBUTE] = element.validation;
	divAttributes[TYPE_ATTRIBUTE] = type;

	newDiv = createNewDiv(instance, FORM_ELEMENT_DIV_ID, FORM_ELEMENT_DIV_CLASS, divAttributes);

	newFormLabel = createNewLabel("", "", label, false);

	newDiv.appendChild(newFormLabel);

	var input_name = label.toLowerCase().replace(/\s/g, '_');
	var input_id = label.toLowerCase().replace(/\s/g, '');

	switch(type) {
		case TEXTBOX_OPTION:
			newFormElement = createNewInput(instance, "text", input_name, input_id, null);

			newDiv.appendChild(newFormElement);

			break;
		case CHECKBOX_OPTION:
			newFormElement = createNewInput(instance, "checkbox", input_name, input_id, null);

			newDiv.appendChild(newFormElement);

		  	break;
		case RADIOBUTTON_OPTION:
			for (var i=0; i<elementOptions.length; i++) {
				var newRadioButtonDiv, newRadioButtonLabel, newRadioButtonInput, divAttributes = {};

				divAttributes[DIV_INSTANCE_ATTRIBUTE] = i+1;

				newRadioButtonDiv = createNewDiv(i+1, RADIOBUTTON_OPTION_DIV_ID + '_' + instance, RADIOBUTTON_OPTION_DIV_CLASS + '_' + instance, divAttributes);
				
				newRadioButtonInput = createNewInput(i+1, "radio", input_name + '_' + instance, input_id + '_' + instance, elementOptions[i].radiobutton);

				newRadioButtonLabel = createNewRadioButtonLabel(i+1, input_id + '_' + instance, elementOptions[i].radiobutton);
								
				newRadioButtonDiv.appendChild(newRadioButtonInput);
				newRadioButtonDiv.appendChild(newRadioButtonLabel);

				newDiv.appendChild(newRadioButtonDiv);
			}
		  
		    break;
		default:
		    break;
	  }

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

		newRadioButtonInput = createNewInput(i+1, "text", RADIOBUTTON_OPTION_INPUT_NAME + '_' + divInstance, RADIOBUTTON_OPTION_INPUT_ID + '_' + divInstance, oldRadioButtonOptionNames[i], RADIOBUTTON_INPUT_ATTRIBUTES);
		
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

		divToAppend = createAdminFormElement(true);

		formContent.appendChild(divToAppend);
	}
}




async function formSearchForms(searchFieldId, formIdContent, submitButtonId) {	
	var searchText;
	var divToAppend, formContent, submitButton;

	formContent = document.getElementById(formIdContent);

	formContent.innerHTML = "";	

	searchText = document.getElementById(searchFieldId).value;

	try {
		var result = await searchDatabaseForForms(searchText);
	
		if (result) {
			result.sort((a,b) => (a.instance > b.instance) ? 1 : ((b.instance > a.instance) ? -1 : 0));

			for (var i=0; i<result.length; i++) {
				if (i+1 == result.length) { lastOne = true;}
				
				divToAppend = createFormsFormElement(result[i]);
				formContent.appendChild(divToAppend);				
			}

			submitButton = document.getElementById(submitButtonId);

			submitButton.style.display = "block";
		}
		
	} catch (error) {
		console.log(error);
	}	
}

async function adminSearchForms(searchFieldId, formIdContent, submitButtonId) {	
	var searchText;
	var divToAppend, formContent, submitButton;

	formContent = document.getElementById(formIdContent);

	formContent.innerHTML = "";	

	searchText = document.getElementById(searchFieldId).value;

	try {
		var result = await searchDatabaseForForms(searchText);
	
		if (!result) {
			divToAppend = createAdminFormElement(true);

			formContent.appendChild(divToAppend);
		} else {
			result.sort((a,b) => (a.instance > b.instance) ? 1 : ((b.instance > a.instance) ? -1 : 0))			

			var lastOne = false;

			for (var i=0; i<result.length; i++) {
				if (i+1 == result.length) { lastOne = true; }				
				
				divToAppend = createAdminFormElement(lastOne, result[i]);
				formContent.appendChild(divToAppend);
			}
		}

		submitButton = document.getElementById(submitButtonId);

		submitButton.style.display = "block";
		
	} catch (error) {
		console.log(error);
	}	
}

function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}



function validateAndSaveAdminForm(e, searchFieldId) {
	e.preventDefault();

	var divElements, formDivs;

	var elements = [];

	var elementOptions = [];

	var flag = 1;

	var formNameElement = document.getElementById(searchFieldId);
	var formName = formNameElement.value;

	var inputs = e.target.getElementsByTagName("input");

	if (formName === "") {
		formNameElement.focus();
		flag = 0;
		alert("Please add a form name");		
	}
	
	for (var i=0; i<inputs.length; i++) {
		if (!inputs[i].value) {
			inputs[i].focus();
			flag = 0;
			alert("Please fill all the inputs");
			break;
		}
	}

	if (flag) {
		formDivs = e.target.childNodes;

		for (var i=0; i<formDivs.length; i++) {
			divElements = formDivs[i].querySelectorAll("[" + ONE_ATTRIBUTE_TO_RULE_THEM_ALL + "]");
			
			var newObject = {};
			var elementId = uuidv4();
			newObject[ELEMENTS_TABLE_KEY] = elementId;
			newObject[DIV_INSTANCE_ATTRIBUTE] = formDivs[i].getAttribute(DIV_INSTANCE_ATTRIBUTE);
			newObject[ELEMENTS_TABLE_INDEX] = formName;
			for (var j=0; j<divElements.length; j++) {
				if (divElements[j].getAttribute(ONE_ATTRIBUTE_TO_RULE_THEM_ALL) == RADIOBUTTON_OPTION) {
					var newOption = {};
					newOption[ELEMENT_OPTIONS_TABLE_KEY] = uuidv4();
					newOption[ELEMENT_OPTIONS_TABLE_INDEX] = elementId;
					var key = divElements[j].getAttribute(ONE_ATTRIBUTE_TO_RULE_THEM_ALL);
					var value = divElements[j].value;
					newOption[key] = value;
					newOption["order"] = j+1;

					elementOptions.push(newOption);
				} else {
					var key = divElements[j].getAttribute(ONE_ATTRIBUTE_TO_RULE_THEM_ALL);
					var value = divElements[j].value;
					newObject[key] = value;					
				}				
			}
			elements.push(newObject);
		}

		saveAdministrationForm(formName, elements, elementOptions);
	}
}

function validateFromElement(formDiv) {
	var validation = formDiv.getAttribute(VALIDATION_ATTRIBUTE);
	var type = formDiv.getAttribute(TYPE_ATTRIBUTE);
	var inputs = formDiv.getElementsByTagName("input");
	var label = formDiv.firstChild.innerHTML;

	var valid = 1;

	switch(validation) {				
		case MANDATORY_OPTION:
			switch (type){
				case TEXTBOX_OPTION: 
					if (inputs[0].value === "") {
						inputs[0].focus();
						alert (label + " is mandatory.");
						valid = 0;
					}
					
					break; 
				case CHECKBOX_OPTION: 
					if (!inputs[0].checked) {
						inputs[0].focus();
						alert (label + " is mandatory.");
						valid = 0;
					} 
					break;
				case RADIOBUTTON_OPTION:
					var ischecked = 0;					
					for (var i=0; i<inputs.length; i++) {
						if (inputs[i].checked) {							
							ischecked = 1;
							break;
						}					
					} 

					if (!ischecked) {
						alert (label + " is mandatory.");
						valid = 0;
					}

					break; 
			   }

			break;
		case NUMERIC_OPTION:
			switch (type){
				case TEXTBOX_OPTION: 
					if (isNaN(inputs[0].value)) {
						alert (label + " must be a number.");
						valid = 0;
					} 
					break; 
				default:
					break;
			   }
		  
			break;		
	}

	return valid;
}


function validateAndSaveFromsForm(e, searchFieldId, versionFieldId) {
	e.preventDefault();

	var elements = [];

	var flag = 1;

	var formNameElement = document.getElementById(searchFieldId);
	var formName = formNameElement.value;

	var formVersionElement = document.getElementById(versionFieldId);
	var formVersion = formVersionElement.value;
			
	if (formName === "") {
		formNameElement.focus();
		flag = 0;
		alert("Please add a form name");		
	}

	if (formVersion === "") {
		formVersionElement.focus();
		flag = 0;
		alert("What version?");
	}

	if (flag) {
		var formDivs = e.target.childNodes;

		var valid = 1;

		for (var i=0; i<formDivs.length; i++) {
			valid = validateFromElement(formDivs[i]);

			if (!valid) { break; }

			var newObject = {};

			newObject[F_FORMS_TABLE_KEY] = uuidv4();
			newObject[DIV_IDB_ATTRIBUTE] = formDivs[i].getAttribute(DIV_IDB_ATTRIBUTE);
			newObject[F_FORMS_TABLE_VERSION] = formVersion;

			var type = formDivs[i].getAttribute(TYPE_ATTRIBUTE);
			var inputs = formDivs[i].getElementsByTagName("input");
			
			switch (type){
				case TEXTBOX_OPTION: 
					newObject[TEXTBOX_OPTION] = inputs[0].value;
					newObject[CHECKBOX_OPTION] = null;
					newObject[RADIOBUTTON_OPTION] = null;
					
					break; 
				case CHECKBOX_OPTION:
					newObject[TEXTBOX_OPTION] = null;
					newObject[CHECKBOX_OPTION] = inputs[0].checked;
					newObject[RADIOBUTTON_OPTION] = null;
					
					break;
				case RADIOBUTTON_OPTION:
					var options = [];					
					for (var i=0; i<inputs.length; i++) {
						if (inputs[i].checked) {							
							options.push(inputs[i].value);
						}					
					}
					
					newObject[TEXTBOX_OPTION] = null;
					newObject[CHECKBOX_OPTION] = null;
					newObject[RADIOBUTTON_OPTION] = options;

					break; 
			}
			
			elements.push(newObject);
		}

		if (valid) {			
			saveFormsForm(elements);
		}
		
	}
}




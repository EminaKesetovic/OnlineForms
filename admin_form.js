/**
* Remove all radio button option inputs on administration form
*
* @param    {Array}     radioButtonOptionsDivs      
*/
function removeRadioButtonOptions(radioButtonOptionsDivs) {
	//Its not working with foor loop and remove() option??
	while(radioButtonOptionsDivs.length > 0){
		radioButtonOptionsDivs[0].parentNode.removeChild(radioButtonOptionsDivs[0]);
	}
}


/**
* Add radio button option inputs on administraton form element
*
* @param    {Number}     nubmerOfRadioButtonOptions   Number of inputs to create for radio button options
* @param    {Number}     divInstance                  Value of the div instance attribute that radio button options belongs to
* @param    {Element}    parentDiv                    Div element to append radio button option inputs to
* @param    {Array}      oldRadioButtonOptionNames    Values in existing radio button option inputs
*/
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


/**
* Complete logic to handle radio button option inputs creation
*
* @param    {Event}     e   Using event propagation here
*/
function addRadioButtonOptionsCreation(e) {
	var divInstance, radioButtonInput, radioButtonOptionsDivs, parentDiv;

	parentDiv = e.target.parentElement;

	divInstance = parentDiv.getAttribute(DIV_INSTANCE_ATTRIBUTE);
	
	//If select box is clicked on (changed option)
	if (e.target && e.target.id == FET_SELECTBOX_ID + '_' + divInstance) {
		radioButtonInput = document.getElementById(RADIOBUTTON_NUMBER_INPUT_ID + '_' + divInstance);
		radioButtonOptionsDivs = document.getElementsByClassName(RADIOBUTTON_OPTION_DIV_CLASS + '_' + divInstance);

		//Always remove radio button options inputs
		removeRadioButtonOptions(radioButtonOptionsDivs);

		if (radioButtonInput) {
			radioButtonInput.remove();			
		}

		//Then if selected option is RADIOBUTTON_OPTION create new radio button inputs
		if (e.target.value == RADIOBUTTON_OPTION) {
			var newNumberRadioButtonOptions;

			newNumberRadioButtonOptions = createNewInput(divInstance, "number", RADIOBUTTON_NUMBER_INPUT_NAME, RADIOBUTTON_NUMBER_INPUT_ID, RADIOBUTTON_MIN_VALUE, RADIOBUTTON_NUMBER_ATTRIBUTES);
					
			e.target.parentNode.insertBefore(newNumberRadioButtonOptions, e.target.nextSibling);

			addRadioButtonOptions(RADIOBUTTON_MIN_VALUE, divInstance, parentDiv, []);			
		}	
	}

	//Radio button option inputs can also be created/removed if value in input that indicates number of radio button options is changed
	if (e.target && e.target.id == RADIOBUTTON_NUMBER_INPUT_ID + '_' + divInstance) {
		var oldRadioButtonOptionNames = [];
		var nubmerOfRadioButtonOptions;

		nubmerOfRadioButtonOptions = e.target.value;
		
		radioButtonOptionsDivs = document.getElementsByClassName(RADIOBUTTON_OPTION_DIV_CLASS + '_' + divInstance);

		//Radio button option inputs are laso first removed then created again, with this foor loop old values are saved
		for (var i=0; i<radioButtonOptionsDivs.length; i++) {
			oldRadioButtonOptionNames.push(radioButtonOptionsDivs[i].lastChild.value);
		}

		removeRadioButtonOptions(radioButtonOptionsDivs);

		addRadioButtonOptions(nubmerOfRadioButtonOptions, divInstance, parentDiv, oldRadioButtonOptionNames);		
	}
}


/**
* Create one row in form for administration tab
*
* @param    {Boolean} showAddButton       Indicator to show add button (if it's the last row in form show it)
* @param    {Object}  element             Element form database (if it's not the creating of empty row) 
* @returns  {Element}                     New div element that contains one form row
*/
function createAdminFormElement(showAddButton, element = null) {
	var newDiv, newFormLabelName, newFormElementType, newFormValidationType, newAddButton, instance, divAttributes = {};

	//Instance is used to differ every row of elements in form
	instance = document.querySelectorAll("." + FORM_ELEMENT_DIV_CLASS).length + 1;
	
	divAttributes[DIV_INSTANCE_ATTRIBUTE] = instance;

	//Set the variables for element values. Default empty values
	var inputValue = INPUT_VALUE;
	var SBtypeValue = "";
	var SBvalidationValue = "";
	var elementOptions = [];

	//If a row is created from elements from the database 
	if (element) {
		divAttributes[DIV_IDB_ATTRIBUTE] = element.id;
		inputValue = element.label;
		SBtypeValue = element.type;
		SBvalidationValue = element.validation;
		elementOptions = element.options;
		elementOptions.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
	}

	//Create elements and append them to div
	newDiv = createNewDiv(instance, FORM_ELEMENT_DIV_ID, FORM_ELEMENT_DIV_CLASS, divAttributes);

	formLabel = createNewLabel(instance, INPUT_ID, INPUT_LABEL);

	newFormLabelName = createNewInput(instance, "text", INPUT_NAME, INPUT_ID, inputValue, INPUT_ATTRIBUTES);

	newFormElementType = createNewSelectBox(instance, FET_SELECTBOX_NAME, FET_SELECTBOX_ID, FET_SELECTBOX_OPTIONS, SBtypeValue, FET_SELECTBOX_ATTRIBUTES);	

	newFormValidationType = createNewSelectBox(instance, FVT_SELECTBOX_NAME, FVT_SELECTBOX_ID, FVT_SELECTBOX_OPTIONS, SBvalidationValue, FVT_SELECTBOX_ATTRIBUTES);

	newDiv.appendChild(formLabel);
	newDiv.appendChild(newFormLabelName);
	newDiv.appendChild(newFormElementType);

	//If there are radio button options create input that indicates numer of radio button options
	if (elementOptions.length !== 0) {
		newNumberRadioButtonOptions = createNewInput(instance, "number", RADIOBUTTON_NUMBER_INPUT_NAME, RADIOBUTTON_NUMBER_INPUT_ID, elementOptions.length, RADIOBUTTON_NUMBER_ATTRIBUTES);
		newDiv.appendChild(newNumberRadioButtonOptions);
	}
	
	newDiv.appendChild(newFormValidationType);

	if (showAddButton) {
		newAddButton = createNewButton(BUTTON_ID, BUTTON_TEXT);	
		newDiv.appendChild(newAddButton);
	}

	//If there are radio button options show them
	if (elementOptions.length !== 0) {
		var radioButtonOptionNames = [];
		
		for (var i=0; i<elementOptions.length; i++) {
			radioButtonOptionNames.push(elementOptions[i].radiobutton);
		}
		addRadioButtonOptions(element.options.length, instance, newDiv, radioButtonOptionNames);
	}

	return newDiv;
}

/**
 * Add new administration form element by clicking on add button
 * 
 * @param {Event} e 
 * @param {String} formIdContent 
 */
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


/**
 * Search database for form and if there is create elements out of it
 * 
 * @param {String} searchFieldId     Id of search field (to get value)
 * @param {String} formIdContent     Form id (to append form elements to)
 * @param {String} submitButtonId    Id of form submit button (to show it)
 */
async function adminSearchForms(searchFieldId, formIdContent, submitButtonId) {	
	var searchText;
	var divToAppend, formContent, submitButton;

	formContent = document.getElementById(formIdContent);

	formContent.innerHTML = "";	

	searchText = document.getElementById(searchFieldId).value;

	try {
        //Wait for the result of async function
		var result = await searchDatabaseForForms(searchText);
	
        //If there is no form found create one empty element
		if (!result) {
			divToAppend = createAdminFormElement(true);

			formContent.appendChild(divToAppend);
		} else {
            //If there is a form, first sort result to get correct order of elements and create it element by element
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


/**
 * Validate and save administartion form
 * 
 * @param {Event}   e               Used to get form
 * @param {String}  searchFieldId   Id of search field (to get form name)
 */
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

        //Go through every form elements row and create object for insertion into database
		for (var i=0; i<formDivs.length; i++) {
            //Find row elements,
            //ONE_ATTRIBUTE_TO_RULE_THEM_ALL is used to distinct form elements important for saving into database of other elements
			divElements = formDivs[i].querySelectorAll("[" + ONE_ATTRIBUTE_TO_RULE_THEM_ALL + "]");
			
			var newObject = {};
			var elementId = uuidv4();
			newObject[ELEMENTS_TABLE_KEY] = elementId;
			newObject[DIV_INSTANCE_ATTRIBUTE] = formDivs[i].getAttribute(DIV_INSTANCE_ATTRIBUTE);
			newObject[ELEMENTS_TABLE_INDEX] = formName;

            //Go through every element in row and continue adding to newObject or add to newOption (if form element is radio button option)
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
                    //In ONE_ATTRIBUTE_TO_RULE_THEM_ALL is information which type of element is, and that is used as key in object
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
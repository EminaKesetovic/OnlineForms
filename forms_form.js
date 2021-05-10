/**
* Create one row in form for forms tab
*
* @param    {Object}        element      Element form database
* @returns  {Element}                    Created one form row
*/
function createFormsFormElement(element) {
	
	var newDiv, newFormLabel, newFormElement, instance, divAttributes = {};
	
	//Instance is used to differ every row of elements in form
	instance = document.querySelectorAll("." + FORM_ELEMENT_DIV_CLASS).length + 1;

	//Set variables for element values and attributes
	var label = element.label;
	var type = element.type;
	var elementOptions = element.options;
	elementOptions.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
	
	divAttributes[DIV_INSTANCE_ATTRIBUTE] = instance;
	divAttributes[DIV_IDB_ATTRIBUTE] = element.id;
	divAttributes[VALIDATION_ATTRIBUTE] = element.validation;
	divAttributes[TYPE_ATTRIBUTE] = type;

	//Every element has parent div and associated label
	newDiv = createNewDiv(instance, FORM_ELEMENT_DIV_ID, FORM_ELEMENT_DIV_CLASS, divAttributes);

	newFormLabel = createNewLabel("", "", label, false);

	newDiv.appendChild(newFormLabel);

	var input_name = label.toLowerCase().replace(/\s/g, '_');
	var input_id = label.toLowerCase().replace(/\s/g, '');

	//New form element is created depending on its type
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

/**
 * Search database for form and if there is create elements out of it
 * 
 * @param {String} searchFieldId     Id of search field (to get value)
 * @param {String} formIdContent     Form id (to append form elements to)
 * @param {String} submitButtonId    Id of form submit button (to show it)
 */
async function formSearchForms(searchFieldId, formIdContent, submitButtonId) {	
	var searchText;
	var divToAppend, formContent, submitButton;

	formContent = document.getElementById(formIdContent);

	formContent.innerHTML = "";	

	searchText = document.getElementById(searchFieldId).value;

	try {
		//Wait for the result of async function
		var result = await searchDatabaseForForms(searchText);
	
		if (result) {
			//If there is a form, first sort result to get correct order of elements and create it element by element
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


/**
 * Validate one element in form
 * 
 * @param    {Element}  formDiv   Div representing one row in form
 * @returns  {Number}             Indicates that form is valid (or not)
 */
function validateFromElement(formDiv) {
	var validation = formDiv.getAttribute(VALIDATION_ATTRIBUTE);
	var type = formDiv.getAttribute(TYPE_ATTRIBUTE);
	var inputs = formDiv.getElementsByTagName("input");
	var label = formDiv.firstChild.innerHTML;

	var valid = 1;

	//Check validation for each type
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
			}

		break;
	}

	return valid;
}

/**
 * Validate and save forms form
 * 
 * @param {Event} e                  Used to get form
 * @param {String} searchFieldId     Id of search field (to get form name)
 * @param {String} versionFieldId    Id of version field (to get form version)
 */
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

		//Go through every form elements row and create object for insertion into database
		for (var i=0; i<formDivs.length; i++) {
			valid = validateFromElement(formDivs[i]);

			if (!valid) { break; }

			var newObject = {};

			newObject[F_FORMS_TABLE_KEY] = uuidv4();
			newObject[DIV_IDB_ATTRIBUTE] = formDivs[i].getAttribute(DIV_IDB_ATTRIBUTE);
			newObject[F_FORMS_TABLE_VERSION] = formVersion;

			var type = formDivs[i].getAttribute(TYPE_ATTRIBUTE);
			var inputs = formDivs[i].getElementsByTagName("input");
			
			//Depending on type some values in object are going to be empty and one of ceratin type is going to be populated 
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
					for (var j=0; j<inputs.length; j++) {
						if (inputs[j].checked) {							
							options.push(inputs[j].value);
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
/**
* Create input element
*
* @param    {Number}   instance           Value of the div instance attribute that input belongs to
* @param    {String}   inputType          Input type (text, numer, checkbox etc.)
* @param    {String}   inputName          Input name
* @param    {String}   inputId            Input id
* @param    {String}   inputValue         Input value
* @param    {Object}   inputAttributes    Input attributes
* @return   {Element}                     Created input element
*/
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
			/*One problem in using the for...in method is that it loops through the properties in the prototype chain as well. 
			Since the objects in JavaScript can inherit properties from their prototypes, 
			the for...in statement will loop through those properties as well??*/
			if (inputAttributes.hasOwnProperty(key)) {
				newInput.setAttribute(`${key}`, `${inputAttributes[key]}`)
			}
		}
	}

	return newInput;
}


/**
* Create label element
*
* @param    {Number}    instance           Value of the div instance attribute that label belongs to
* @param    {String}    inputId            Id of the input that label is for
* @param    {String}    inputLabel         Label text
* @param    {Boolean}   setForAttribute    Set for attribute in label element
* @return   {Element}                      Created label element
*/
function createNewLabel(instance, inputId, inputLabel, setForAttribute = true) {
	var newInputLabel;

	newInputLabel = document.createElement("Label");

	if (setForAttribute) {
		newInputLabel.setAttribute("for", inputId + '_' + instance);
	}
	
	newInputLabel.innerHTML = inputLabel + instance;

	return newInputLabel;
}


/**
* Create label element for radio button
*
* @param    {Number}    instance           Value of the div instance attribute that label belongs to
* @param    {String}    inputId            Id of the input that label is for
* @param    {String}    inputLabel         Label text
* @return   {Element}                      Created label element
*/
function createNewRadioButtonLabel(instance, inputId, inputLabel) {
	var newInputLabel;

	newInputLabel = document.createElement("Label");

	newInputLabel.setAttribute("for", inputId + '_' + instance);	
	
	newInputLabel.innerHTML = inputLabel;

	return newInputLabel;
}


/**
* Create select box element
*
* @param    {Number}    instance               Value of the div instance attribute that select box belongs to
* @param    {String}    selectBoxName          Select box name
* @param    {String}    selectBoxId            Select box id
* @param    {String}    selectBoxOptions       Select box options
* @param    {String}    selectBoxValue         Select box selected value
* @param    {Object}    selectBoxAttributes    Select box attributes
* @return   {Element}                          Created select box element
*/
function createNewSelectBox(instance, selectBoxName, selectBoxId, selectBoxOptions, selectBoxValue, selectBoxAttributes = null) {
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

	if (selectBoxValue) {
		newSelectBox.value = selectBoxValue;
	}

	return newSelectBox;
}


/**
* Create button element
*
* @param    {String}    buttonId         Button id
* @param    {String}    buttonText       Button text
* @return   {Element}                    Created select button element
*/
function createNewButton(buttonId, buttonText) {
	var newButton;

	newButton = document.createElement("button");
	newButton.id = buttonId;
	newButton.textContent = buttonText;	

	return newButton;
}


/**
* Create div element
*
* @param    {Number}    instance         Value of the div instance attribute
* @param    {String}    divId            Div id
* @param    {String}    divClass         Div class
* @param    {Object}    divAttributes    Div attributes
* @return   {Element}                    Created div element
*/
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
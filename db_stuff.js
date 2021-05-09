/**
* Check if database exists, and if not, create the database together with tables
*/
function setDB() {

	var objectStore = null;

	if (!indexedDB) {
		alert("Your browser doesn't support a stable version of IndexedDB.");
	}

	const request = indexedDB.open(DB_NAME, VERSION);

	//if there is no database, create it
	request.onupgradeneeded = function(event) {
		console.log("Created new database");
		const db = event.target.result;		
				
		// check if there is a table with given name
		// if not, add table (and index)
		if (!db.objectStoreNames.contains(FORMS_TABLE)) {
			objectStore = db.createObjectStore(FORMS_TABLE, { autoIncrement: true, keyPath: FORMS_TABLE_KEY});
		};

		if (!db.objectStoreNames.contains(ELEMENTS_TABLE)) {
			objectStore = db.createObjectStore(ELEMENTS_TABLE, { autoIncrement: true, keyPath: ELEMENTS_TABLE_KEY});

			objectStore.createIndex(ELEMENTS_TABLE_INDEX, ELEMENTS_TABLE_INDEX, {unique: false});
		};

		if (!db.objectStoreNames.contains(ELEMENT_OPTIONS_TABLE)) {
			objectStore = db.createObjectStore(ELEMENT_OPTIONS_TABLE, { autoIncrement: true, keyPath: ELEMENT_OPTIONS_TABLE_KEY});

			objectStore.createIndex(ELEMENT_OPTIONS_TABLE_INDEX, ELEMENT_OPTIONS_TABLE_INDEX, {unique: false});
		};

		if (!db.objectStoreNames.contains(F_FORMS_TABLE)) {
			objectStore = db.createObjectStore(F_FORMS_TABLE, { autoIncrement: true, keyPath: F_FORMS_TABLE_KEY});

			objectStore.createIndex(F_FORMS_TABLE_C_INDEX, [F_FORMS_TABLE_VERSION, DIV_IDB_ATTRIBUTE], {unique: true});
			objectStore.createIndex(F_FORMS_TABLE_VERSION, F_FORMS_TABLE_VERSION, {unique: false});
		};

		db.close();
	};
}

/**
* Save form in administration tab
*
* @param    {String}   formName           Name of the form
* @param    {Array}    formElements       Elements in the form
* @example  {
*              id: "1af7ccbe-8dad-452d-a50c-fc48c3954e6b",
*              form_name: "test",              
*              instance: "1",
*              label: "godine",
*              type: "textbox",
*              validation: "numeric"
*            }
* @param    {Array}    elementOptions     Radio button options in elements
* @example  {
*              element_id: "448e1e41-7a17-4986-b8e5-e76f2074c8f8",
*              id: "0912266d-e89f-4c53-bfd9-29fb790dc683",
*              order: 5
*           }
*/
function saveAdministrationForm(formName, formElements, elementOptions) {
	const request = indexedDB.open(DB_NAME, VERSION);

	request.onsuccess = function(e) {
		console.log("Successfully opened the database"); 
		const db = e.target.result;
		
        //Open transaction for inserting data into tables
		const transaction = db.transaction([FORMS_TABLE, ELEMENTS_TABLE, ELEMENT_OPTIONS_TABLE], 'readwrite');

		const formsStore = transaction.objectStore(FORMS_TABLE);
		const elementsStore = transaction.objectStore(ELEMENTS_TABLE);
		const elementOptionsStore = transaction.objectStore(ELEMENT_OPTIONS_TABLE);

		var formsObject = {};
		formsObject[FORMS_TABLE_KEY] = formName;
		
        //Insert form name
		formsStore.add(formsObject);
		
        //Insert form elements
		for (let i=0; i<formElements.length; i++) {
			elementsStore.add(formElements[i]);
		}

        //Insert elements radio options
		for (let i=0; i<elementOptions.length; i++) {
			elementOptionsStore.add(elementOptions[i]);
		}
		
		transaction.onsuccess = function(e){
			console.log("Saved the data!");
		}
		
		transaction.onerror = function(e){
			console.log("Error:", e.target.error.message);
		}

		// Clean up: close connection
		transaction.oncomplete = function(e){
			console.log("Closed the database");
			db.close();
		}
	}

	request.onerror = function(e) { 
		console.log("Error:", e.target.error.message); 
	}
}

function saveFormsForm(formElements) {
	const request = indexedDB.open(DB_NAME, VERSION);

	request.onsuccess = function(e) {
		console.log("Successfully opened the database"); 
		const db = e.target.result;
		
		const transaction = db.transaction([F_FORMS_TABLE], 'readwrite');

		const formsStore = transaction.objectStore(F_FORMS_TABLE);		
			
		for (let i=0; i<formElements.length; i++) {
			formsStore.add(formElements[i]);
		}
		
		transaction.onsuccess = function(e){
			console.log("Saved the data!");
		}
		
		transaction.onerror = function(e){
			console.log("Error:", e.target.error.message);
		}

		// Clean up: close connection
		transaction.oncomplete = function(e){
			console.log("Closed the database");
			db.close();
		}
	}

	request.onerror = function(e) { 
		console.log("Error:", e.target.error.message); 
	}
}


function searchDatabaseForForms(formName) {
	return new Promise(
		function(resolve, reject) {
			const request = indexedDB.open(DB_NAME, VERSION);			

			request.onsuccess = function(e) {
				console.log("Successfully opened the database"); 
				const db = e.target.result;				
				
				const transaction = db.transaction([FORMS_TABLE, ELEMENTS_TABLE, ELEMENT_OPTIONS_TABLE], 'readonly');
				
				const formsStore = transaction.objectStore(FORMS_TABLE);

				const elementsStore = transaction.objectStore(ELEMENTS_TABLE);				
				const formElementsRange = IDBKeyRange.only(formName);
				const elementsStoreIndex = elementsStore.index(ELEMENTS_TABLE_INDEX);

				const elementOptionsStore = transaction.objectStore(ELEMENT_OPTIONS_TABLE);
				const elementOptionsStoreIndex = elementOptionsStore.index(ELEMENT_OPTIONS_TABLE_INDEX);

				const form = formsStore.get(formName);	
								
				form.onsuccess = function(e){
					console.log("Successfuly opened forms");
					const formResult = e.target.result;					

					if (formResult) {
						var elements = elementsStoreIndex.openCursor(formElementsRange);

						var elementsArray = [];
						
						elements.onsuccess = function(e) {
							var cursor = e.target.result;							
			
							if (cursor) {
								const elementOptionsRange = IDBKeyRange.only(cursor.value.id);

								const elementOptions = elementOptionsStoreIndex.getAll(elementOptionsRange);

								elementOptions.onsuccess = function(e) {
									//what sorcery is this??
									cursor.value.options = e.target.result;									
								}
								
								elementOptions.onerror = function(e) {
									reject("Error searching element options:", e.target.error.message);
								}

								elementsArray.push(cursor.value);								

								cursor.continue();
							} else {
								resolve(elementsArray);	
							}													
						}
						
						elements.onerror = function(e) {															
							reject("Error searching form elements:", e.target.error.message);
						}
						
					} else {
						resolve (formResult);
					}
				}
				
				form.onerror = function(e){
					console.log("Error seraching forms:", e.target.error.message);
					reject("Error seraching forms:", e.target.error.message);
				}

				transaction.oncomplete = function(e){
					console.log("Closed the database");
					db.close();
				}
			}
			request.onerror = function(e) { 
				console.log("Error opening database:", e.target.error.message);
				reject("Error opening database:", e.target.error.message);
			}
		}
	);	
}
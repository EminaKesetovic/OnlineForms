function searchDatabaseForForms(formName) {
	return new Promise(
		function(resolve, reject) {
			const request = indexedDB.open(DB_NAME, VERSION);			

			request.onsuccess = function(e) {
				console.log("Successfully opened the database"); 
				const db = e.target.result;				
				
				const transaction = db.transaction([FORMS_TABLE, ELEMENTS_TABLE], 'readonly');

				const formsStore = transaction.objectStore(FORMS_TABLE);
				const elementsStore = transaction.objectStore(ELEMENTS_TABLE);
				
				const elementsStoreIndex = elementsStore.index(ELEMENTS_TABLE_INDEX);		

				const form = formsStore.get(formName);	
								
				form.onsuccess = function(e){
					console.log("Successfuly opened forms");
					const formResult = e.target.result;					

					if (formResult) {						
						var formInstancesElements = [];
						
						for (var i=1; i<=formResult.number_instances; i++) {
							stringI = i.toString()
							const formElementsRange = IDBKeyRange.only([formResult.name, stringI]);

							const elements = elementsStoreIndex.getAll(formElementsRange);

							var promise = new Promise(function(resolve, reject) {
														elements.onsuccess = function(e) {							
															resolve(e.target.result);
														}
							
														elements.onerror = function(e) {															
															reject("Error searching form elements:", e.target.error.message);
														}
													});

							const instanceElements = async (i, formInstancesElements) => {
								const a = await promise;
								var newElementInstance = {
									"instance":i,
									"elements":a
								}
								formInstancesElements.push(newElementInstance);
							};

							instanceElements(stringI, formInstancesElements);
						}

						resolve(formInstancesElements);
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
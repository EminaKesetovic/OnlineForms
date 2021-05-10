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


/**
 * Function to create unique value
 * @returns  {String}   Unique string
 */
function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}










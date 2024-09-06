
var data;
var lang;
function loadData(folder){
	fetch(`${folder + 'js/langdata.json'}`).then((response) => response.json()).then(jsonData => {
		localStorage.clear()
		localStorage.data = JSON.stringify(jsonData);
		
	})
	data = JSON.parse(localStorage.data);
		console.log(data);
}
function saveData(){
	localStorage.clear()
	localStorage.data = JSON.stringify(data);
}

function changeLang (page) {
	loadData();
	console.log(data);
	switch (lang) {
		case "en":
			data['current'] = 'es'
			break;
		case "es":
			data['current'] = 'en'
			break;
	}
	saveData();
	update(page)
	
}
function update(page){
	localStorage.data = JSON.stringify(data);
	lang = data['current'];
	var currentLang = data[page][lang];
	const global = data['global'][lang];
	for (const key in global) {

		console.log(`Key: ${key}, Elem: ${document.getElementById(key)}`)
		try {
			document.getElementById(key).textContent = global[key];
		} catch (error) {
			continue;
		}
		
	}
	for (const key2 in currentLang) {
		console.log(key2);

		var element = document.getElementById(key2);
		if(key2 === "info"){
			var elems = document.getElementsByClassName(key2);
			for (let i = 0; i < elems.length; i++) {
				elems.item(i).textContent = currentLang[key2]
				
			}
		}
		else if (key2 === "current"){
			continue;
		}
		try {
			
		switch (element.tagName) {
			case "title":
				element.innerHTML = currentLang[key2];
				break;
			default:
				document.getElementById(key2).textContent = currentLang[key2];
				break;
		}
		} catch (error) {
			
		}
	}
}
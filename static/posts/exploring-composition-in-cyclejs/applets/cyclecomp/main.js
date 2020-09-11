import confirm from './components/confirm'
import nameform_01 from './components/nameform_01'
import nameform_02 from './components/nameform_02'
import nameform_03 from './components/nameform_03'
import nameform_04 from './components/nameform_04'
import textentry_01 from './components/textentry_01'
import textentry_02 from './components/textentry_02'
import textentry_03 from './components/textentry_03'
import textentry_04 from './components/textentry_04'

import {makeDOMDriver} from '@motorcycle/dom'
import Cycle from '@cycle/most-run'

import makeStoreDriver from './storedriver'

const apps = {confirm, nameform_01, nameform_02, nameform_03, nameform_04, textentry_01, textentry_02, textentry_03, textentry_04}

window.attachApps = function(){
	Object.keys(apps).forEach(function(appname){
		var container = document.querySelector('#app_'+appname)
		if (container){
			let sources = {DOM: makeDOMDriver(container)}
			if (true){
				sources.store = makeStoreDriver(appname)
			}
			Cycle.run(apps[appname],sources);
			container.classList.add("app");
			container.classList.add("showkids");
		}
	});
}

console.log("Created attach apps func")
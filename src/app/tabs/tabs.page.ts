import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
	public isTab2: boolean;
	constructor(){
		this.isTab2 = false;
	}

	tabChanged = function(e){
		this.isTab2 = document.URL.replace('http://','').split('/')[2] == 'tab2';	
	}
}

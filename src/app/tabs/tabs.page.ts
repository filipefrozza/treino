import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
	public isDetalhe: boolean;
	public isEditar: boolean;
	constructor(){
		this.isDetalhe = false;
		this.isEditar = false;
	}

	tabChanged = function(e){
		this.isDetalhe = document.URL.replace('http://','').split('/')[2] == 'detalhe';	
		this.isEditar = document.URL.replace('http://','').split('/')[2] == 'editar';	
	}
}

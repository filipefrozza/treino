import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Bolo } from '../bolos';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
	bolos: Bolo[] = [];

	constructor(
		public api: ApiService,
	    public loadingController: LoadingController,
	    public router: Router,
	    public route: ActivatedRoute
	){}

	ngOnInit() {
    	this.getBolos();
  	}

  	async getBolos() {
	    const loading = await this.loadingController.create({
	      message: 'Loading...'
	    });
	    await loading.present();
		try{
		    await this.api.getBolos().subscribe(res => {
		        this.bolos = res;
		        console.log(this.bolos);
		        loading.dismiss();
		    }, err => {
		        console.log(err);
		        loading.dismiss();
		    });
		}catch(e){
			console.log(e);
			loading.dismiss();
		}
  	}

  	drop(event: CdkDragDrop<string[]>) {
    	moveItemInArray(this.bolos, event.previousIndex, event.currentIndex);
  	}
}

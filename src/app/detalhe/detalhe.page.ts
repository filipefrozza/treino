import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bolo } from '../bolos';

@Component({
  selector: 'app-detalhe',
  templateUrl: 'detalhe.page.html',
  styleUrls: ['detalhe.page.scss']
})
export class DetalhePage {
	bolo:Bolo = { _id: null, nome: '', descricao: '', peso: null, preco: null, updated_at: null };

  	constructor(
  		public api: ApiService,
    	public loadingController: LoadingController,
    	public alertController: AlertController,
    	public route: ActivatedRoute,
    	public router: Router
   	) {};

  	ngOnInit() {
    	this.getBolo();
  	}

  	async getBolo() {
	    if(this.route.snapshot.paramMap.get('id') == 'null') {
	      this.presentAlertConfirm('Você não escolheu um item na lista');
	    } else {
	      const loading = await this.loadingController.create({
	        message: 'Loading...'
	      });
	      await loading.present();
	      console.log(this.route.snapshot.params);
	      await this.api.getBolo(this.route.snapshot.params['id'])
	        .subscribe(res => {
	          console.log(res);
	          this.bolo = res;
	          loading.dismiss();
	        }, err => {
	          console.log(err);
	          loading.dismiss();
	        });
	    }
  	}

  	async delete(id) {
  		console.log(id);
	    const loading = await this.loadingController.create({
	      message: 'Loading...'
	    });
	    await loading.present();
	    await this.api.deleteBolo(id).subscribe(res => {
	        loading.dismiss();
	        this.router.navigate([ '/tabs' ]);
	    }, err => {
	        console.log(err);
	        loading.dismiss();
	    });
  	}

  	async presentAlertConfirm(msg: string) {
	    const alert = await this.alertController.create({
	      	header: 'Warning!',
	      	message: msg,
	      	buttons: [
		        {
		          text: 'Okay',
		          handler: () => {
		            this.router.navigate(['']);
		          }
		        }
	      	]
	    });

	    await alert.present();
  	}
}

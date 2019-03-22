import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Bolo } from '../bolos';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

	  boloForm: FormGroup;
	  _id:any='';
	  nome:string='';
	  descricao:string='';
	  peso:number=null;
	  preco:number=null;

  	constructor(
  		public api: ApiService,
	    public loadingController: LoadingController,
	    public alertController: AlertController,
	    public route: ActivatedRoute,
	    public router: Router,
	    private formBuilder: FormBuilder
	  ) {}

  	ngOnInit() {
    	this.getBolo(this.route.snapshot.params['id']);
    	this.boloForm = this.formBuilder.group({
	      	'nome' : [null, Validators.required],
	      	'descricao' : [null, Validators.required],
	      	'peso' : [null, Validators.required],
	      	'preco' : [null, Validators.required]
    	});
  	}

  	async getBolo(id) {
	    if(this.route.snapshot.params['id'] == 'null') {
	      this.presentAlertConfirm('You are not choosing an item from the list');
	    } else {
	      	const loading = await this.loadingController.create({
	        	message: 'Loading...'
	      	});
      		await loading.present();
      		await this.api.getBolo(id).subscribe(data => {
          		this._id = data._id;
          		this.boloForm.setValue({
            		nome: data.nome,
            		descricao: data.descricao,
            		preco: data.preco,
            		peso: data.peso
          		});
          		loading.dismiss();
        	}, err => {
          		console.log(err);
          		loading.dismiss();
        	});
    	}
  	}

  	async onFormSubmit(form:NgForm) {
    	await this.api.updateBolo(this._id, form).subscribe(res => {
          	let id = res['_id'];
          	this.router.navigate([ `/tabs/detalhe/${id}`], { relativeTo: this.route.parent });
        }, (err) => {
          	console.log(err);
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
      	]});

    	await alert.present();
  	}
}

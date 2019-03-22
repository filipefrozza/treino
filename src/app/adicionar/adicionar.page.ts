import { Component } from '@angular/core';import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Bolo } from '../bolos';

@Component({
  selector: 'app-adicionar',
  templateUrl: 'adicionar.page.html',
  styleUrls: ['adicionar.page.scss']
})
export class AdicionarPage {
	boloForm: FormGroup;
	nome:string='';
	descricao:string='';
	preco:number=null;
	peso:number=null;

	constructor(
		public api: ApiService,
	    public loadingController: LoadingController,
	    public alertController: AlertController,
	    public route: ActivatedRoute,
	    public router: Router,
	    private formBuilder: FormBuilder
	){};

	ngOnInit() {
	    this.boloForm = this.formBuilder.group({
	      	'nome' : [null, Validators.required],
	      	'descricao' : [null, Validators.required],
	      	'preco' : [null, Validators.required],
	      	'peso' : [null, Validators.required]
	    });
	}	

	async onFormSubmit(form:NgForm) {
	    const loading = await this.loadingController.create({
	      	message: 'Loading...'
	    });
	    await loading.present();
	    await this.api.addBolo(form).subscribe(res => {
	        let id = res['_id'];
	        loading.dismiss();
	        console.log("addBolo",res);
	        this.router.navigate([ `/tabs/detalhe/${id}` ], { relativeTo: this.route.parent });
	        // this.router.navigate([ { outlets: { tab2: id } } ], { relativeTo: this.route.parent });
	    }, (err) => {
	        console.log(err);
	        loading.dismiss();
	    });
	}
}

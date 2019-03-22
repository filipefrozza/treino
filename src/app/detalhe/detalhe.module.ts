import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetalhePage } from './detalhe.page';

// import { Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: '',
//     component: DetalhePage
//   }
// ];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: DetalhePage }])
  ],
  declarations: [DetalhePage]
})
export class DetalhePageModule {}

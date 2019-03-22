import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'detalhe/:id',
        children: [
          {
            path: '',
            loadChildren: '../detalhe/detalhe.module#DetalhePageModule'
          }
        ]
      },
      {
        path: 'editar/:id',
        children: [
          {
            path: '',
            loadChildren: '../editar/editar.module#EditarPageModule'
          }
        ]
      },
      {
        path: 'adicionar',
        children: [
          {
            path: '',
            loadChildren: '../adicionar/adicionar.module#AdicionarPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

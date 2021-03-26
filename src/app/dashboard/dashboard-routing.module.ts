import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImagemComponent } from './home/imagem/imagem.component';
import { CadItemComponent } from './home/item/cad-item/cad-item.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {path:'imagem', component: ImagemComponent},
  {path:'item', component: CadItemComponent},
  {path:'home', component: HomeComponent},
  {path:'', pathMatch:'full', redirectTo:'home'},
  {path:'**', component:PageNotFoundComponent},

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

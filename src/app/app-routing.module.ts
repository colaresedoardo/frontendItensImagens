import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
// import { ItemComponent } from './home/item/item.component';

const routes: Routes = [
  // {path:'', component: HomeComponent},
  // {path:'/item', component: ItemComponent},
  // {path:'imagem', component: ImagemComponent},
  // {path:'', pathMatch:'full',redirectTo:'/main/people'},
  // {path:'main', loadChildren:'./main/main.module#MainModule'}
  {path:'site', loadChildren: ()=>import('./dashboard/dashboard.module').then( m=> m.DashboardModule), canActivate:[AuthGuard]},
  {path:'', redirectTo:'site', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy',  preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

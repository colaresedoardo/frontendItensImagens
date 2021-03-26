import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './home/item/item.component';
import { ImagemComponent } from './home/imagem/imagem.component';
import { DashboardRoutingModule } from './dashboard-routing.module' 
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { SafePipe } from './home/utils/safe.pipe';
import { CadItemComponent } from './home/item/cad-item/cad-item.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ItemService } from './services/item.service';
import { ImagemService } from './services/imagem.service';

import { DialogComponent } from './utils/dialog/dialog.component';
@NgModule({
  declarations: [HomeComponent, ItemComponent, ImagemComponent, SafePipe, CadItemComponent, PageNotFoundComponent,  DialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpClientModule,
    MaterialFileInputModule
  ],
  providers:[ItemService, ImagemService],
  exports:[HomeComponent, ItemComponent, ImagemComponent]
})
export class DashboardModule { }

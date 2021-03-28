import { BreakpointObserver , Breakpoints} from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Imagem } from '../models/imagem';
import { Item } from '../models/item';
import { ImagemService } from '../services/imagem.service';
import { ItemService } from '../services/item.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   cols : number;
  public items$:Observable<Item[]>
  public items:any = []
  public sublista:any = []
  public auxLista:any[] =[]
  public tituloItem:string
  public imagens:Imagem[]=[]
  private unsubscribe$: Subject<any> = new Subject()
  @ViewChild("tab") tab:MatTabGroup 

//tamanho de tela
  gridByBreakpoint = {
    xl: 5,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
  }
  constructor(private breakpointObserver: BreakpointObserver, private itemsService:ItemService, private imagemService:ImagemService) { 
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .subscribe(r =>{
      if (r.matches) {
        if (r.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (r.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (r.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (r.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (r.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    })

  }

  ngOnInit(): void {
   
    console.log("entrei no ng init")
    this.imagemService.get().pipe().subscribe((img)=>{
      this.imagens =img
    } )

    this.itemsService.get()
    .pipe(
      takeUntil(this.unsubscribe$),
     ).subscribe(
        (items)=>{
          console.log("entrei no subscribe")
          this.items =items
          console.log(this.items)
        }
      )

      console.log("NgOnInit Monitorando items -----------------")
      console.log(this.items)
      console.log("NgOnInit Monitorando items -----------------")
    
 
  }
 

  ngOnDestroy(){
    this.unsubscribe$.next()
  }
  ngOnChange(){
    console.log("NgOnChange")
  }
  atualItems(){
    console.log(this.items)
  }
 async selacionar(item:Item){
 
    // trocando de aba
    this.tab.selectedIndex=1
    console.log(item.titulo)
    console.log("item selecionado")
    console.log(item)
    this.tituloItem =item.titulo
    this.combinarItemImage(item.item)

  

  }

 combinarItemImage(item:any[]){
  
      for(let i of  item ){
       
        let auxImagem = this.imagens.filter(im => im._id == i.imagem)[0]
        if(!auxImagem ){
          console.log("IMAGEM UNDEFINED")
        }else{
       
       
         i.imagem =auxImagem;
         
      
      }
      this.sublista.push(i)
     }
    
 }

  onTabChanged(event){
    console.log(event)
    if(event.index ==0){
      // console.log("entrei aqui")
      this.sublista=[]
      this.tituloItem =""
      
    }
   
    // console.log("Monitorando items -----------------")
    // console.log(this.items)
    // console.log("Monitorando items -----------------")

    // console.log("Monitorando subitens -----------------")
    // console.log(this.sublista)
    // console.log("Monitorando subitens -----------------")
    
  }

  

}



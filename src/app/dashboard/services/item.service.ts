import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Imagem } from '../models/imagem';
import { Item } from '../models/item';
import { ImagemService } from './imagem.service';

@Injectable(
{providedIn:'root'}
)
export class ItemService {
  readonly url = `${environment.API}/site/item`
  private itemsSubject$:BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(null)
  private imagem:Imagem[]
  private loaded:boolean = false
  constructor(private http:HttpClient, private imagemService:ImagemService) { }

  get():Observable<Item[]>{
    if(!this.loaded){
      combineLatest([this.http.get<Item[]>(this.url) , this.imagemService.get()]).pipe(
        filter(([item, imagem])=>{
          return item !=null  && imagem !=null
        }),
        map(([item, imagem])=>{
          // for( let i of item){
          
          //    for(let img of imagem){
          //      i.imagem = img
          //    }
          // }
        
          return item
        })
      ).subscribe(data=>{
        this.itemsSubject$.next(data)
      })

      this.loaded =true
    }
    return this.itemsSubject$.asObservable()
  }

  add(itemRecurso:Item):Observable<Item>{
    // let departments = (prod.departments as Department[]).map(d=>d._id);
  
    let idItems:string[] =  itemRecurso.item.map(item=>`${item?._id}` )
    let idImagem = (itemRecurso.imagem as Imagem)._id   
  
    return this.http.post<Item>(this.url,{titulo:itemRecurso.titulo, linkResource: itemRecurso.linkResource,
       imagem:idImagem,item:idItems}). pipe(

       tap( (i)=>{



      
        
        
        let imagem:Imagem
       
        let items = this.itemsSubject$.getValue()
        // if(items.length > 0){
          this.imagemService.get().subscribe((img)=>{ this.imagem =img } )
          // console.log("Valores anteriores "+JSON.stringify(items))
          // console.log("ids imagens "+ this.imagem.map(i=>i._id))
          // console.log("id da imagem no item "+i.imagem)
        
         // console.log("item id imagem "+items.map(i=>i.imagem._id))
         let img = this.imagem.findIndex(img=> {
             return img._id ===idImagem
          
         })
        
         if(img>=0){
          i.imagem =  this.imagem[img]
           // i.imagem = items[img]?.imagem
        //  }
          
        
        }
        
       
        this.itemsSubject$.getValue().push(i)
     
      }
      )
      
    )
  }

  del(item:Item):Observable<any>{
    console.log("id item "+item._id)
    return this.http.delete(`${this.url}/${item._id}`).pipe(
      tap(()=>{
        let items = this.itemsSubject$.getValue( )
        let i = items.findIndex(it=>it._id === item._id)
        console.log("item deleteado"+ i)
        if(i>=0){
          items.splice(i,1)
        }
      }))
  }
  update(item:Item):Observable<any>{
    const itemId = item.item.map(i => i._id)
    const imagemId = item.imagem._id
    console.log("Obj a ser alterado "+item.imagem._id)
    return this.http.patch(`${this.url}/${item._id}`,{...item, imagem:imagemId, item:itemId }).pipe(tap(()=>{
      console.log("dentro do update")
      let items = this.itemsSubject$.getValue()
      console.log("array "+items)
      let i = items.findIndex(i=>i._id === item._id)
      console.log("imprimindo o i "+ i)
      if(i>=0){
        items[i] = item
      }
    }))
    // const image
 
  }
}

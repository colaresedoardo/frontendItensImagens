import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Imagem } from '../models/imagem';
import {tap} from 'rxjs/operators'

import { Item } from '../models/item';
import { environment } from 'src/environments/environment';

@Injectable()
export class ImagemService {
  readonly url =`${environment.API}/imagem`
  
  private imagemsSubject$:BehaviorSubject<Imagem[]> = new BehaviorSubject<Imagem[]>(null)
  private loaded:boolean = false

  constructor(private http:HttpClient) {


 
   }

  get():Observable<Imagem[]>{
    if(!this.loaded){
      
      this.http.get<Imagem[]>(this.url).pipe(
        
      ).subscribe( data =>{
          this.imagemsSubject$.next(data)
      }, err=>{
       
      })
      this.loaded =true
    }

    return this.imagemsSubject$.asObservable()
    
    
 
  }

  add(img:any):Observable<any>{
    // console.log("aqui imagem "+img)
    return this.http.post<any>(this.url, img).pipe(
      tap((img:any)=>this.imagemsSubject$.getValue().push(img))
    )
  }
  del(img:Imagem): Observable<any>{
    return this.http.delete(`${this.url}/${img._id}`).pipe(
      tap(()=>{
        let imgs = this.imagemsSubject$.getValue()
        let i = imgs.findIndex(i=> i._id ===img._id)
        if(i>=0){
          imgs.splice(i,1)
        }
      })
    )
  }
  update(img:any): Observable<any>{
    const id = img.get("_id")
    return this.http.patch(`${this.url}/${id}`,img).pipe(
      tap((imagem)=>{
        console.log("nova imagem "+imagem._id)
        let imgs = this.imagemsSubject$.getValue()
        let i = imgs.findIndex(i=> i._id ===imagem._id)
        console.log("index "+i)
        if(i>=0){
          imgs[i] = imagem
        }
      })
    )
  }
}

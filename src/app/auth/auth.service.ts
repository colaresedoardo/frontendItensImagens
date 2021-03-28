import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from './usuario';

@Injectable({providedIn:'root'})
export class AuthService {
  readonly url =`${environment.API}/auth`
  
  usuarioSubject$:BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(null)
  usuarioLogado$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  
  constructor(private http:HttpClient) {


 
   }

   register(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.url}/registrar`,usuario)
   }
   login(credenciais:{email:string, password:string}):Observable<Usuario>{
     
    return this.http.post<Usuario>(`${this.url}/login`,credenciais).pipe(
      tap((u:Usuario)=>{
          localStorage.setItem('token', u.token)
          this.usuarioSubject$.next(u)
          this.usuarioLogado$.next(true)
      }))
   }

   loginGoogle(){
     
    return this.http.get(`${this.url}/google`).pipe(
      tap((u:any)=>{
          console.log(u)
      }))
   }



   isAuthenticated():Observable<boolean>{
     const token =  localStorage.getItem('token')
     if(token && !this.usuarioLogado$.value){
       console.log("verificando se está autenticado")
       return this.checkTokenValidation(  )
     }
     return this.usuarioLogado$.asObservable()
   }
  getUser():Observable<Usuario>{
    return this.usuarioSubject$.asObservable()
  }

  logout(){
    localStorage.removeItem('token')
    this.usuarioSubject$.next(null)
    this.usuarioLogado$.next(false)
  }
  checkTokenValidation():Observable<boolean>{
    return this.http.get<Usuario>(`${this.url}/usuario`).pipe(
      tap(
        (u:Usuario)=>{
          this.usuarioLogado$.next(true)
          this.usuarioSubject$.next(u)
          localStorage.setItem('token',u.token)
        }
      ),
      map(
        (u:Usuario)=>{
          return (u)?true:false
        }
      ),
      catchError(
        (err)=>{
          this.logout()
          return of(false)
        }
      )

    )
  }
}

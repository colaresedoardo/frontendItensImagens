import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { forwardRef, Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";


import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";





@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor( @Inject(forwardRef(() => AuthService)) private authService:AuthService,
    @Inject(forwardRef(() => Router)) private router:Router
    ){

    }
    //Intercepta e verifica se o token está setado no cabeçalho.
    //Caso, já esteja logado este token fique sendo trafegado em 
    //cada requisição
    intercept(req:HttpRequest<any>, next:HttpHandler){
        
        if(localStorage.getItem('token')){
            
            let token = localStorage.getItem('token')
            // faz uma cópia da requisição pois está é imutável
            const authReq = req.clone({
                setHeaders:{
                    Authorization:token
                }
            })
           
            // Na api quando n tem token é retornado 401, porém há outros erros feita pela api do browser
            // então é necessário pegar o httpResponseError do Browser.
            // Além disso, como handle é um observeble é possível pegar o catchError
            console.log("Tem token")
            console.log(authReq)
            return next.handle(authReq).pipe(
                catchError( (error)=>{
                  
                    if(error instanceof HttpErrorResponse){
                       
                        if(error.status === 401){
                            this.authService.logout()
                            this.router.navigateByUrl('/auth/login')
                            
                           
                        }
                    }
                    return throwError(error)
                })
            )
        }
       
        return next.handle(req)
    }
}
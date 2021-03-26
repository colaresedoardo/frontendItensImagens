import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
// Serviço responsável por ativar uma rota, se tem permissão ou não. É possível criar vários Guards para determinados 
//grupos. Por exemplo, um para verificar se é adm ou usuário comum
export class AuthGuard implements CanActivate{

  constructor(private route:Router, private authService:AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): Observable<boolean> {
      return this.authService.isAuthenticated().pipe(
        tap(b=>{
          if(!b){
            this.route.navigateByUrl('/auth/login')
          }
        })
      )
  }
}

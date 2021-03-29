import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Usuario } from './auth/usuario';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'loginapp';

  public authenticated$:Observable<boolean>
  public user$:Observable<Usuario>

  constructor( private router:Router, private authService:AuthService){
   
    
  }
  ngOnInit(){
    this.authenticated$= this.authService.isAuthenticated()
    this.user$ = this.authService.getUser()
  }
  logout(){
    this.authService.logout()
    this.router.navigateByUrl('/auth/login')
  }

}

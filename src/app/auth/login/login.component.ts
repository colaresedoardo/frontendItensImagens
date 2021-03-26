import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = this.fb.group({
    
    'email':['', [Validators.required, Validators.email]],
    'password':['', [Validators.required, Validators.minLength(5)]],
   
  } )
  constructor(private fb:FormBuilder, private authService:AuthService, private snackBar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    const credenciais = this.loginForm.value
    this.authService.login(credenciais).subscribe((usuario)=>{
      console.log(usuario)
      this.snackBar.open("Bem vindo","Ok",{duration:2000})
      this.router.navigateByUrl('/site/home')
    },
    (err)=>{
      console.log("aconteceu algum problema "+err)
      this.snackBar.open("Falha ao logar","Ok",{duration:2000})
    })
  }

  logarGoogle(){
    // console.log("chamando logar google")
    this.authService.loginGoogle().subscribe()
  }
}

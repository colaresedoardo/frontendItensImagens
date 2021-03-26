import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  formRegister = this.fb.group({
    '_id':[null],
    'nome':['', Validators.required],
    'login':['', Validators.required],
    'email':['', [Validators.required, Validators.email]],
    'password1':['', [Validators.required, Validators.minLength(5)]],
    'password2':['', [Validators.required, Validators.minLength(5)]],
  } )
  

  constructor(private fb:FormBuilder, private authService:AuthService, private snackBar:MatSnackBar, private router:Router) {
    this.formRegister.setValidators(this.matchingPassords)
   }

  ngOnInit( ): void {
  }
  save(){
    console.log(this.formRegister.value)
    let usuario:Usuario = {...this.formRegister.value, password:this.formRegister.value.password1}
   
    this.authService.register(usuario).subscribe((usuario)=>{
      console.log(usuario)
      this.snackBar.open("Cadastrado com sucesso","Ok",{duration:2000})
      this.router.navigateByUrl('/auth/login')

    },
    (err)=>{
      console.log("aconteceu algum problema "+err)
      this.snackBar.open(err.err.message,"Ok",{duration:2000})
     
    })
  }
  matchingPassords(group:FormGroup){
    if( group){
      const password1 = group.controls['password1'].value
      const password2 = group.controls['password2'].value
      if(password1 == password2){
        return null
      }
    }
    return {matching:false}
  }
}

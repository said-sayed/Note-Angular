import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $:any
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  isClick = false;
  isResponse = "";

  constructor(private _AuthService:AuthService,private _Router : Router) {
    if(_AuthService.isLoggedIn()){
      _Router.navigate(['/profile'])
    }
   }

  signIn =new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)]),
  })
  formData(){


    this.isClick=true;
    if(this.signIn.valid){
      this._AuthService.signIn(this.signIn.value).subscribe(res=>{

        if (res.message == "success") {
          localStorage.setItem("TOKEN",res.token)
          this.isClick=false;
          this.isResponse = res.message;
          this._Router.navigate(['/profile'])


        }
        else{
          this.isClick=false;
          this.isResponse = res.message;
          console.log(this.isResponse);

        }
      })
    }

  }
  ngOnInit(): void {
    $('#signIn').particleground()
  }

}

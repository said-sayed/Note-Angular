import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var $: any
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isBtnInvalid = { 'background-color': 'gray' }
  isBtnValid = { 'background-color': '#17a2b8' }
  isClick = false;
  isResponse = "";

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  signUp = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z]/),
    Validators.maxLength(10), Validators.minLength(3)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z]/),
    Validators.maxLength(10), Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)]),
    age: new FormControl('', [Validators.required])
  })
  formData() {
    this.isClick = true
    if (this.signUp.valid) {

      this._AuthService.signUp(this.signUp.value).subscribe(response => {
        console.log(response);

        if (response.message == "success") {
          this.signUp.reset();
          this.isClick = false;
          this.isResponse = response.message
          this._Router.navigate(['/signin'])
        }

        else{
          this.isClick = false;
          this.isResponse = response.errors.email.message;

        }

      })

    }

  }
  ngOnInit(): void {
    $('#signUp').particleground()
  }

}

import jwt_decode from "jwt-decode";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://routeegypt.herokuapp.com/';
  full_name:any;

  constructor(private _HttpClient: HttpClient) { }

  signUp(data: any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'signup',data)
  }

  signIn(data: any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'signin',data)
  }

  signOut(data: any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'signOut',data)
  }
  isLoggedIn(){
    return !!localStorage.getItem('TOKEN')
  }
  getName(){
    if(localStorage.getItem('TOKEN')){
      let token:any =localStorage.getItem('TOKEN');
      let decoded:any = jwt_decode(token);
       this.full_name = decoded.first_name + " " + decoded.last_name;
      }
      return this.full_name;
  }

}

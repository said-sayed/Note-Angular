import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  baseUrl = 'https://routeegypt.herokuapp.com/'

  constructor(private _HttpClient: HttpClient) { }

  getUserNotes(data:any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'getUserNotes', data)
  }
  addNote(data:any):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'addNote', data)

  }

  deleteNote(data:any):Observable<any>{
    // headers
    let options:any={
      headers:new HttpHeaders({}),
      body:{
        NoteID:data.NoteID,
        token:data.token
      }
    }
    return this._HttpClient.delete(this.baseUrl + 'deleteNote', options)

  }

  updateNote(data:any):Observable<any>{

    return this._HttpClient.put(this.baseUrl + 'updateNote',data)

  }
}

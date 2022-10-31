import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotesService } from './../notes.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";


declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']

})
export class ProfileComponent implements OnInit {

  ///////=====   Values   ===//////////

  Notes: any[] = [];
  token: any;
  decoded: any;
  isClick = false;
  isLoad = false;
  loadMOvie = false;



  ///////=====   constructor    ===//////////

  constructor(private _Router: Router, private _NotesService: NotesService) {

   try{
    this.token = localStorage.getItem('TOKEN');
    this.decoded = jwt_decode(this.token);
   }
   catch(error){
  // localStorage.clear();
    _Router.navigate(['/signin'])
    error.clear()
   }

    this.getUserNotes();
    if (!localStorage.getItem('TOKEN')) {
      _Router.navigate(['/signin'])
    }



  }

  ///////=====   Form Group    ===//////////

  addNote = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required)
  })

  editeNote =new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required)
  })


  ///////=====   Get All Notes    ===//////////

  getUserNotes() {

    let data = {
      token: this.token,
      userID: this.decoded._id
    }

    this._NotesService.getUserNotes(data).subscribe(res => {
      console.log(res);

          this.isLoad = true;
          this.Notes = res.Notes;
          this.loadMOvie = true;

    })
  }



  ///////=====   Add Notes    ===//////////

  addData() {
    this.isClick = true;

    let data = {
      title: this.addNote.value.title,
      desc: this.addNote.value.desc,
      token: this.token,
      citizenID: this.decoded._id
    }

    this._NotesService.addNote(data).subscribe(res => {

      if (res.message == "success") {
        this.addNote.reset();
        this.isClick = false;
        $("#addNote").modal('hide')
        this.getUserNotes();
      }

    })
  }



  ///////=====   Get Note_ID     ===//////////

  noteDelete: any;
  getID(id: any) {
    this.noteDelete = id;
  }
  ///////=====   Delete Notes    ===//////////

  deleteNote() {

    this.isClick = true;

    let data = {
      NoteID: this.noteDelete,
      token: this.token
    }
    this._NotesService.deleteNote(data).subscribe(res => {
      console.log(res);

      if (res.message == "deleted") {
        $("#deleteNote").modal('hide')
        this.getUserNotes();
        this.isClick = false;
      }

    })
  }


  ///////=====   Edit Note    ===//////////
  noteEdite: any;
  setValue(info: any) {

    this.noteEdite = {
      title:info.title,
      desc:info.desc,
      NoteID:info._id,
      token:this.token
    };
    console.log(this.noteEdite);
    this.editeNote.controls.title.setValue(this.noteEdite.title)
    this.editeNote.controls.desc.setValue(this.noteEdite.desc)
  }

  updateNote() {
    this.isClick = true;
    this.isLoad = true;
    let data = {
      title: this.editeNote.value.title,
      desc: this.editeNote.value.desc,
      NoteID: this.noteEdite.NoteID,
      token: this.noteEdite.token
    }
    console.log(data);

    this._NotesService.updateNote(data).subscribe(res => {
      console.log(res);
      if (res.message == "updated") {
        this.isLoad = false;
        this.isClick = false;

        $("#editNote").modal('hide')
        this.getUserNotes();
      }

    })
  }

  ngOnInit(): void {
  }

}

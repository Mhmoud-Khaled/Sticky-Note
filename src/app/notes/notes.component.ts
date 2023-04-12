import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{

  status:any = "INVALID"
  data:any = []
  dataForm!:FormGroup;
  title:string= ""
  text:string= ""
  editbtn:boolean = false
  addbtn:boolean = false
  id:number = 0

  constructor(private fb:FormBuilder, private service:ServicesService){
  }

  note = document.getElementsByClassName("add-note")

  ngOnInit(): void {
    this.createFrom()
    this.getNotes()
  }

  createFrom(){
    this.dataForm = this.fb.group({
      title:['' , [Validators.required]],
      text:['' , [Validators.required]]
    })
  }

  show(){
    this.note[0].classList.toggle("active")
    this.addbtn = true
  }

  add(){
    // console.log('###############')
    this.loadData()

    this.note[0].classList.toggle("active")
    this.clear()
    this.addbtn = false
  }

  loadData(){
    //
    this.status = this.dataForm.status
    if(this.status === "VALID"){
      console.log("VALID")
      const model = {
        title : this.dataForm.value.title,
        text : this.dataForm.value.text
      }
      this.service.postData(model).subscribe((res:any)=>{
        // console.log("Done")
        //
        this.getNotes()
      })

    }else{
      console.log("IN-VALID")

    }
  }

  clear(){
    this.dataForm.reset()
  }

  getNotes(){
    this.service.getData().subscribe((res:any)=>{
      this.data = res
      // console.log(this.data)
      if(this.data.length ==  1){
        if(this.data[0].title == undefined){

        }else{

        }
      }else{

      }
    })
  }

  edit(id:number){
    this.id = id
    this.note[0].classList.toggle("active")
    this.editbtn = true

    //load Data
    this.service.getDataById(id).subscribe((res:any)=>{
      this.title = res.title
      this.text = res.text
      this.dataForm.value.title = res.title
      this.dataForm.value.text = res.text
    })
  }

  afterEdit(){
    let model = {
      title : this.dataForm.value.title,
      text : this.dataForm.value.text
    }
    if(model.title == '' || model.title == null ){
      model.title = this.title
    }
    if(model.text == '' || model.text == null){
      model.text = this.text
    }
    this.service.putDataById(this.id, model).subscribe((res:any)=>{
      // console.log("update")
      this.getNotes()
    })

    this.note[0].classList.toggle("active")
    this.editbtn = false
    this.title = ''
    this.text = ''
    this.clear()
  }

  delete(id:number){
    if(id === 1){
      console.log("can't Delete")
      let model = {
        title : "1st Note",
        text : "Wellcom"
      }
      this.service.putDataById((this.id+1), model).subscribe((res:any)=>{
        // console.log("update")
        this.getNotes()
      })
    }else{
      this.service.deleteById(id).subscribe((res:any)=>{
        console.log("Delete Success")
        this.getNotes()
      })
    }
  }

}

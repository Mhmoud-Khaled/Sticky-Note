import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit{

  city:string = 'Alexandria'
  counrty:string = 'Egypt'
  method:number = 3
  year:number = new Date().getFullYear()
  month:number = new Date().getMonth() + 1
  day:number = new Date().getDate()
  timing:any
  second:any = ""
  minut:any
  hour:any
  dayName:any
  constructor(private service:ServicesService){}

  ngOnInit(): void {
    this.getPray()
    setInterval(() => {
      this.Clock(),
      this.detDay()
    }, 1000);
  }

  getPray(){

    this.service.getPrayTime(this.year,this.month,this.city,this.counrty,this.method).subscribe((res:any)=>{
      this.timing = res.data[this.day-1].timings
    })
  }

  Clock(){
    var d = new Date();
    this.second = d.getSeconds();
    this.minut = d.getMinutes();
    this.hour = d.getHours();
  }

  detDay(){
    var days = ['الأحد', 'الأثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة', 'السبت'];
    var d = new Date();
    this.dayName = days[d.getDay()];
    console.log(this.dayName)
  }

}

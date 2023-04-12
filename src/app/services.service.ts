import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { min } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  getPrayTime(year:number, month:number, city:string, country:string, method:number){
    const url = `http://api.aladhan.com/v1/calendarByCity/${year}/${month}`
    let queryParams = new HttpParams();
    queryParams = queryParams.append('city',city)
    queryParams = queryParams.append('country',country)
    queryParams = queryParams.append('method',method)
    return this.http.get(url,{params:queryParams})
  }

  postData(model:any){
    return this.http.post("http://localhost:3000/data",model)
  }

  getData(){
    return this.http.get("http://localhost:3000/data")
  }
  getDataById(id:number){
    return this.http.get("http://localhost:3000/data/"+id)
  }

  putDataById(id:number, model:any){
    return this.http.put("http://localhost:3000/data/"+id, model)
  }

  deleteById(id:number){
    return this.http.delete("http://localhost:3000/data/"+id)
  }

}

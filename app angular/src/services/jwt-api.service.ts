import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JwtApiService {

  constructor(private http: HttpClient) {
  }
  login(token: any): Observable<any> {

    const { email, password } = token;
    const btoaParams = `${email}:${password}`
    const headers = new HttpHeaders({
      "Content-Type": "aplication/json",
      "Authorization": `Basic ${btoa(btoaParams)}`
    })

    return this.http.post(`http://127.0.0.1:3000/login`, { email, password }, { headers: headers })
  }

  getUsers(token){
    const headers = new HttpHeaders({
      "Content-Type":"aplication/json",
      "Authorization": `Bearer ${token}`
    })
    return this.http.get('http://127.0.0.1:3000/users', {headers: headers, responseType: 'json'})
  }


}



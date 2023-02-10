import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Users } from '../shared/users';

const baseUrl = 'http://localhost:8080/api/user';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }

  // returns all users
  getAll(): Observable<Users[]> {
    return this.http.get<Users[]>(baseUrl);
  }

  // returns single user based on id
  get(id: any): Observable<Users> {
    let API_URL = `${baseUrl}/${id}`;
    return this.http.get<Users>(API_URL, { headers : this.httpOptions.headers});
  }

  // crate a new user
  create(data: Users): Observable<any> {

    let API_URL = `${baseUrl}/add-user`; 
    return this.http.post(API_URL, data, { headers : this.httpOptions.headers});
  }

  // update the existing user
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update-user/${id}`, data, { headers : this.httpOptions.headers});
  }

  // delete the existing user based on id
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-user/${id}`, { headers : this.httpOptions.headers});
  }

}
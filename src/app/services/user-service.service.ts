import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../shared/users';

const baseUrl = 'http://localhost:8080/api/user';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  public _selectedUser: Users;

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }

  /**
   * Gets the selcted user.
   */
  public get selectedUser(): Users {
    return this._selectedUser;
  }

  getAll(): Observable<Users[]> {
    return this.http.get<Users[]>(baseUrl);
  }

  get(id: any): Observable<Users> {
    let API_URL = `${baseUrl}/${id}`;
    return this.http.get<Users>(API_URL, { headers : this.httpOptions.headers});
  }

  create(data: Users): Observable<any> {

    let API_URL = `${baseUrl}/add-user`;
    
    return this.http.post(API_URL, data, { headers : this.httpOptions.headers});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update-user/${id}`, data, { headers : this.httpOptions.headers});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-user/${id}`, { headers : this.httpOptions.headers});
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  // findByTitle(title: any): Observable<Users[]> {
  //   return this.http.get<Users[]>(`${baseUrl}?name=${name}`);
  // }
}
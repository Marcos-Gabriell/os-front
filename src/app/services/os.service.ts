import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OS } from '../models/OS';

@Injectable({
  providedIn: 'root'
})
export class OsService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private htpp : HttpClient,
    private snack : MatSnackBar
    ) { }

  findAll():Observable<OS[]> {
    const url = this.baseUrl + "/os";
    return this.htpp.get<OS[]>(url);
  }
  
  findById(id: any):Observable<OS> {
    const url = `${this.baseUrl}/os/${id}`;
    return this.htpp.get<OS>(url);
  }
  
  create(os : OS):Observable<OS> {
    const url = this.baseUrl + "/os";
    return this.htpp.post<OS>(url, os);
  }

  update(os: OS): Observable<OS> {
    const url = `${this.baseUrl}/os`;
    return this.htpp.put<OS>(url, os);
  }

  delete(id : any): Observable<void> {
    const url = `${this.baseUrl}/os/${id}`;
    return this.htpp.delete<void>(url);
  }

  message(msg : string): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
 }
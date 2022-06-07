import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpEvent,HttpParams,HttpRequest   } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../Model/User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url=environment.hostUrl;
  user:User=new User();
  tab:any=[];
  public curUser= new BehaviorSubject(this.user);
  sharedUser = this.curUser.asObservable();
  constructor(private http:HttpClient) {

   }


  login(data:any):Observable<User>{


    return this.http.post<User>(this.url+"/user/signin/"+data.email+"/"+data.password,data);
  }
  loginwidhoutObservable(data:any){

    return this.http.post(this.url+"/user/signin/"+data.email+"/"+data.password,data).pipe(map((res) => {
      this.tab=res;
      this.curUser.next(this.tab);
    }));
  }
   
}

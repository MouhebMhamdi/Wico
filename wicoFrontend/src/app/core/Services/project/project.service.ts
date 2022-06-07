import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpEvent,HttpParams,HttpRequest   } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Projects } from '../../Model/Projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url=environment.hostUrl;
  project:Projects=new Projects();
  tab:any=[];
  public curProject= new BehaviorSubject(this.project);
  sharedProject = this.curProject.asObservable();
  constructor(private http:HttpClient) { }

  addProject(data:Projects,idUser:Number):Observable<Projects>{
    return this.http.post<Projects>(this.url+"/project/add/"+idUser,data);
  }

  getAllProjectByIdUser(idUser:Number):Observable<Projects[]>{
    return this.http.get<Projects[]>(this.url+"/project/all/"+idUser);
  }

  getAllProjectr():Observable<Projects[]>{
    return this.http.get<Projects[]>(this.url+"/project/all");
  }
}

import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpEvent,HttpParams,HttpRequest   } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Projects } from '../../Model/Projects';
import { Technologies } from '../../Model/Technologies';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url=environment.hostUrl;
  project:Projects=new Projects();
  technologies:Technologies=new Technologies();
  tab:any=[];
  public curProject= new BehaviorSubject(this.project);
  sharedProject = this.curProject.asObservable();
  constructor(private http:HttpClient) { }

  addProject(data:any,idUser:Number,idTech:Number[]):Observable<Projects>{
    return this.http.post<Projects>(this.url+"/project/add/"+idUser+"/"+idTech,data);
  }

  getAllProjectByIdUser(idUser:Number):Observable<Projects[]>{
    return this.http.get<Projects[]>(this.url+"/project/all/"+idUser);
  }

  getAllProject():Observable<Projects[]>{
    return this.http.get<Projects[]>(this.url+"/project/all");
  }

  takeProject(idDev:Number,idProject:Number):Observable<Projects>{
    return this.http.get<Projects>(this.url+"/project/takeProject/"+idProject+"/"+idDev);
  }
  ConcelProject(idDev:Number,idProject:Number):Observable<Projects>{
    return this.http.get<Projects>(this.url+"/project/ConcelProject/"+idProject+"/"+idDev);
  }

  getProjectById(id:Number):Observable<Projects>{
    return this.http.get<Projects>(this.url+"/project/getProjectById/"+id);
  }

  updateProject(id:Number,idTech:Number[],Data:Projects):Observable<Projects>{
    return this.http.put<Projects>(this.url+"/project/update/"+id+"/"+idTech,Data);
  }


  deleteProject(id:Number):Observable<Projects>{
    return this.http.delete<Projects>(this.url+"/project/delete/"+id);
  }

  getAllTech():Observable<Technologies[]>{
    return this.http.get<Technologies[]>(this.url+"/project/tech/all");
  }

  getHistoryProjectByUser(idUser:Number):Observable<Projects[]>{
    return this.http.get<Projects[]>(this.url+"/project/history/"+idUser);
  }
}

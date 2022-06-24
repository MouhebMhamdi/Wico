import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Projects } from 'src/app/core/Model/Projects';
import { domain, Technologies } from 'src/app/core/Model/Technologies';
import { User } from 'src/app/core/Model/User';
import { ProjectService } from 'src/app/core/Services/project/project.service';
import { AuthService } from 'src/app/core/Services/user/auth.service';
import * as urlRegex from 'url-regex';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idUser:Number;
  Projects:Projects[];
  srcPdf="";
  domain:domain;
  searchTerm = '';
  term = '';
  p:any=1;
  more:any=200;
  hide=true;
  project:Projects;
  developper:User;
  idProjectfinished:Number;
  myFormFinishProject:FormGroup;
  submittedLogin:Boolean=false;
  constructor(private router:Router,private modalService: NgbModal,private toastr:ToastrService,private authService:AuthService,private projectService:ProjectService) { }

  ngOnInit(): void {
    let role =localStorage.getItem('role');
    if(role==null) this.router.navigate(['/login']);
    if(role!="PERSONNELS")this.router.navigate(['/login']);

    let id=Number(localStorage.getItem("idUser"));
    this.idUser=id;
    this.getAllProjects();
    const urlRegexx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.myFormFinishProject=new FormGroup({
      projectLink:new FormControl("",[Validators.required,Validators.pattern(urlRegexx),])
     
    })
  }
  ShowMore(){
    this.hide=false;
    this.more=50000;
  }
  ShowLess(){
    this.hide=true;
    this.more=200;
  }
  
  showpdf(pdf:any,fileType:any){
    this.srcPdf='data:'+fileType+';base64,' + pdf;
    return this.srcPdf;
  }
  getAllProjects(){
    
    this.projectService.getAllProject().subscribe(res=>{
      console.log(res)
      this.Projects=res;
    },(err)=>console.error("error "+err));
  }

  takeProject(idDev:Number,idProject:Number){
    this.projectService.takeProject(idDev,idProject).subscribe(res=>{
      this.getAllProjects();
      this.toastr.success("Project token","Personnel notification");
    },(err)=>{
      if(err.status==417){
        this.toastr.error("You don't have the rights to take more then one project please complete your mession and try again","Personnel notification");
      }
    });
  }

  sendProjectToTheClient(idProject:Number,content:any){
    this.idProjectfinished=idProject;
    this.opencontent(content);
  }
  projectFinished(){
    this.submittedLogin = true;
    if (this.myFormFinishProject.invalid) {
      return;
    }
    let data={
      projectLink:this.myFormFinishProject.controls['projectLink'].value
    }
    this.projectService.setFinishedProject(this.idProjectfinished,data).subscribe(res=>{
      this.toastr.success("Project sended successfully !!","Personnel notification")
    },(err)=>this.toastr.error("You have an error  !!"+err,"Personnel notification"))
  }
  opencontent(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res:any) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.getAllProjects();
    });
  }
  ConcelProject(idDev:Number,idProject:Number){
    this.projectService.ConcelProject(idDev,idProject).subscribe(res=>{
      this.getAllProjects();
      this.toastr.success("Project Cancelled","Personnel notification");
    },(err)=>this.toastr.error("You have an error please try again or contact the admin","Personnel notification"));
  }

 
}

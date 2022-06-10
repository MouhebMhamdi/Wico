import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Projects } from 'src/app/core/Model/Projects';
import { domain, Technologies } from 'src/app/core/Model/Technologies';
import { ProjectService } from 'src/app/core/Services/project/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idUser:Number;
  Projects:Projects[];
 
  domain:domain;
  searchTerm = '';
  term = '';
  p:any=1;
  more:any=200;
  hide=true;
  constructor(private router:Router,private toastr:ToastrService,private projectService:ProjectService) { }

  ngOnInit(): void {
    let role =localStorage.getItem('role');
    if(role==null) this.router.navigate(['/login']);
    if(role!="PERSONNELS")this.router.navigate(['/login']);

    let id=Number(localStorage.getItem("idUser"));
    this.idUser=id;
    this.getAllProjects();
  }
  ShowMore(){
    this.hide=false;
    this.more=50000;
  }
  ShowLess(){
    this.hide=true;
    this.more=200;
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
    },()=>this.toastr.error("You have an error please try again or contact the admin","Personnel notification"));
  }

  
  ConcelProject(idDev:Number,idProject:Number){
    this.projectService.ConcelProject(idDev,idProject).subscribe(res=>{
      this.getAllProjects();
      this.toastr.success("Project Cancelled","Personnel notification");
    },(err)=>this.toastr.error("You have an error please try again or contact the admin","Personnel notification"));
  }

 
}

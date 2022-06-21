import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Projects } from 'src/app/core/Model/Projects';
import { User } from 'src/app/core/Model/User';
import { ProjectService } from 'src/app/core/Services/project/project.service';
import { AuthService } from 'src/app/core/Services/user/auth.service';

@Component({
  selector: 'app-home-projects',
  templateUrl: './home-projects.component.html',
  styleUrls: ['./home-projects.component.css']
})
export class HomeProjectsComponent implements OnInit {
  projects:Projects[];
  idUser:Number;
  term = '';
  p:any=1;
  user:User;
  imgSrc="";
  constructor(private router:Router,private toastr:ToastrService, private projectService:ProjectService,private modalService: NgbModal,private authService:AuthService) { }

  ngOnInit(): void {
    let id=Number(localStorage.getItem("idUser"));
    this.idUser=id;
    this.getHistoryProjects();
  }
  getHistoryProjects(){
    this.projectService.getAllProject().subscribe(res=>{
      
      this.projects=res;
    })

  }

  getDevelopper(id:Number,content:any){
    
      this.authService.getUserById(id).subscribe(res=>{
        console.log(res)
        this.user=res;
      })
      this.opencontent(content);
  }
  opencontent(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res:any) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.getHistoryProjects();
      this.user=new User();
    });
  }
  image(img:any,fileType:any){
    this.imgSrc='data:'+fileType+';base64,' + img;
    return this.imgSrc;
  }
  onImgError(event:any){
    event.target.src ="assets/img/empty.jpg";
    
  }
}

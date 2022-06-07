import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projects } from 'src/app/core/Model/Projects';
import { domain } from 'src/app/core/Model/Technologies';
import { ProjectService } from 'src/app/core/Services/project/project.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  idUser:Number;
  Projects:Projects[];
  domain:domain;
  searchTerm = '';
  term = '';
  p:any=1;
  constructor(private router:Router,private projectService:ProjectService) { }

  ngOnInit(): void {
    let role =localStorage.getItem('role');
    if(role==null) this.router.navigate(['/login']);
    let id=Number(localStorage.getItem("idUser"));
    this.idUser=id;

    this.getAllProjectsByIdUser();
  }


  getAllProjectsByIdUser(){
    
    this.projectService.getAllProjectByIdUser(this.idUser).subscribe(res=>{
      console.log(res)
      this.Projects=res;
    },(err)=>console.error("error "+err));
  }

}

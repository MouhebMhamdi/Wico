import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Projects } from 'src/app/core/Model/Projects';
import { ProjectService } from 'src/app/core/Services/project/project.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  projects:Projects[];
  idUser:Number;
  term = '';
  p:any=1;
  constructor(private router:Router,private toastr:ToastrService, private projectService:ProjectService,private modalService: NgbModal) { }

  ngOnInit(): void {
    let id=Number(localStorage.getItem("idUser"));
    this.idUser=id;
    this.getHistoryProjects();
  }


  getHistoryProjects(){
    this.projectService.getHistoryProjectByUser(this.idUser).subscribe(res=>{
      console.log(res)
      this.projects=res;
    })

  }


}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Technologies } from 'src/app/core/Model/Technologies';
import { ProjectService } from 'src/app/core/Services/project/project.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {
  technologies:Technologies[]
  technologie:Technologies
  myFormLogin:FormGroup;
  submittedLogin:Boolean=false;

  p=1;
  constructor(private router:Router,private toastr:ToastrService, private projectService:ProjectService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllTechnologies();
    this.technologie=new Technologies();
    this.myFormLogin=new FormGroup({
      domain:new FormControl("",[Validators.required]),
      techName:new FormControl("",[Validators.required]),
      description:new FormControl("",[Validators.required]),
    })
  }

  getAllTechnologies(){
    this.projectService.getAllTech().subscribe(res=>{
      this.technologies=res;
    })
  }
  
  addTech(){
    this.submittedLogin = true;
    if (this.myFormLogin.invalid) {
      return;
    }
    this.projectService.addTech(this.technologie).subscribe(res=>{
      this.toastr.success("Technologies added !!","Admin notification");
      this.getAllTechnologies();
    },()=>this.toastr.error("We have an error please try again ","Admin notification"));
    
  }

  deleteTech(idTech:Number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "If you delete this all projects registred widh this technologies will be deleted ! you won't be able to revert this !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.projectService.deleteTech(idTech).subscribe(res=>{
          this.toastr.success("Technologies deleted !!","Admin notification");
          this.getAllTechnologies();
        },()=>this.toastr.error("We have an error please try again ","Admin notification"))
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
       
      }
    })
  }

  opencontent(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res:any) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.getAllTechnologies();
      this.technologie=new Technologies();
    });
  }
}

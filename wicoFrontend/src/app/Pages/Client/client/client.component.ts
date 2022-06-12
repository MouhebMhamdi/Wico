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
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  idUser:Number;
  Projects:Projects[];
  domain:domain;
  Project:Projects;
  searchTerm = '';
  idUpdate:Number;
  term = '';
  myForm: FormGroup;
  myForm1: FormGroup;
  Technologies:Technologies[];
  submittedLogin:Boolean=false;
  more:any=200;
  hide=true;
  p:any=1;
  handler:any = null;
  developper:User;
  Pdf:any;
  srcPdf="";
  token:any;
  constructor(private router:Router,private toastr:ToastrService,private authService:AuthService, private projectService:ProjectService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllTechnologies();
    let role =localStorage.getItem('role');
    if(role==null) this.router.navigate(['/login']);
    if(role!="CLIENTS")this.router.navigate(['/login']);
    let id=Number(localStorage.getItem("idUser"));
    this.idUser=id;
    this.Project=new Projects();
    this.myForm= new FormGroup({
      'title':new FormControl(this.Project.title,Validators.required),
      'startDate':new FormControl(this.Project.startDate,Validators.required),
      'deadLine':new FormControl(this.Project.deadLine,Validators.required),
      'description':new FormControl(this.Project.description,Validators.required),
      'price':new FormControl(this.Project.price,Validators.required),
      'tech':new FormControl([],Validators.required),
    })
    this.myForm1= new FormGroup({
      'title':new FormControl(this.Project.title,Validators.required),
      'startDate':new FormControl(this.Project.startDate,Validators.required),
      'deadLine':new FormControl(this.Project.deadLine,Validators.required),
      'description':new FormControl(this.Project.description,Validators.required),
      'price':new FormControl(this.Project.price,Validators.required),
      'tech':new FormControl([],Validators.required),
    })
    this.getAllProjectsByIdUser();
    this.loadStripe();

    
      
  }
  showpdf(pdf:any,fileType:any){
    this.srcPdf='data:'+fileType+';base64,' + pdf;
    return this.srcPdf;
  }

  ConcelProject(idDev:Number,idProject:Number){
    this.projectService.ConcelProject(idDev,idProject).subscribe(res=>{
      this.getAllProjectsByIdUser();
      this.toastr.success("Project Cancelled","Personnel notification");
    },(err)=>this.toastr.error("You have an error please try again or contact the admin","Personnel notification"));
  }
  pay(amount:any,idProject:Number) {    
    let email=localStorage.getItem("email");
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token:  (token: any)=> {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        
        this.token=token.id;
        this.projectService.pay(this.idUser,idProject,"CARD",String(token.id)).subscribe(res=>{
        },()=>{
          this.getAllProjectsByIdUser();
          this.toastr.success("Payment made thanks !","Payement")})
      }
      
      
    })
    
    handler.open({
      name: 'Wico',
      email:email,
      description: 'Projects pay',
      amount: amount * 100,
      image:"https://cdn-icons-png.flaticon.com/512/2331/2331941.png",
      currency: "TND",
    });
    
  
  }
  
  loadStripe() {
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
      
       
      window.document.body.appendChild(s);
    }
  }
  ShowMore(){
    this.hide=false;
    this.more=50000;
  }
  ShowLess(){
    this.hide=true;
    this.more=200;
  }
  ajoutProject(){
    this.submittedLogin = true;
    if (this.myForm1.invalid) {
      return;
    }

    if(this.myForm1.controls['startDate'].value>=this.myForm1.controls['deadLine'].value){
      this.toastr.error("Error date");
      return;
    }
    let data={
      'title':this.myForm1.controls['title'].value,
      'startDate':this.myForm1.controls['startDate'].value,
      'deadLine':this.myForm1.controls['deadLine'].value,
      'description':this.myForm1.controls['description'].value,
      'price':this.myForm1.controls['price'].value,
    }
    
    this.projectService.addProject(data,this.idUser,this.myForm1.controls['tech'].value).subscribe(res=>{
      this.toastr.success("Project added successfuly !!");
      this.getAllProjectsByIdUser();
    },()=>{this.toastr.error("Error","Client notification")})
  }
  getAllProjectsByIdUser(){
    
    this.projectService.getAllProjectByIdUser(this.idUser).subscribe(res=>{
      console.log(res)
      this.Projects=res;
    },(err)=>console.error("error "+err));
  }
  ShowPdfUser(idDev:Number,idProject:Number,content:any){
    this.authService.getDevelopperByProject(idDev,idProject).subscribe(res=>{
      this.developper=res;
    })
    this.opencontent(content);
  }
  open(content:any,id:Number) {
    this.idUpdate=id;
    this.getProjectById(id);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res:any) => {
     // this.closeResult = `Closed with: ${result}`;
     
    }, (reason:any) => {
      this.getAllProjectsByIdUser();
      this.Project=new Projects();
    });
  }
  opencontent(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res:any) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.getAllProjectsByIdUser();
      this.Project=new Projects();
    });
  }
  close(content:any) {
    this.getAllProjectsByIdUser();
    this.Project=new Projects();
    this.modalService.dismissAll(content);
  }

  getAllTechnologies(){
    this.projectService.getAllTech().subscribe(res=>{
      console.log(res)
      this.Technologies=res;
    })
  }
  getProjectById(id:Number){
    this.projectService.getProjectById(id).subscribe(res=>{
      this.Project=res;
    })
  }
  updateProject(){
    
    this.submittedLogin = true;
    if (this.myForm.invalid) {
      return;
    }

    if(this.myForm.controls['startDate'].value>=this.myForm.controls['deadLine'].value){
      this.toastr.error("Error date");
      return;
    }
    console.log(this.myForm1.controls['tech'].value)
    this.projectService.updateProject(this.idUpdate,this.myForm.controls['tech'].value,this.myForm.value).subscribe(res=>{
      this.toastr.success("Project updated","Client notification");
    },()=>this.toastr.error("Error please try again","Client notification"))
  }

  deleteProject(id:Number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.projectService.deleteProject(id).subscribe(res=>{
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.getAllProjectsByIdUser();
        },()=>{
          swalWithBootstrapButtons.fire(
            'Error',
            'You have an error please try again :)',
            'error'
          )
          this.getAllProjectsByIdUser();
        })
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
        this.getAllProjectsByIdUser();
      }
    })
  }
}

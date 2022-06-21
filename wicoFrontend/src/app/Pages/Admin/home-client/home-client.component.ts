import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/Model/User';
import { ProjectService } from 'src/app/core/Services/project/project.service';
import { AuthService } from 'src/app/core/Services/user/auth.service';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent implements OnInit {
  idUser:Number;
  term="";
  users:User[];
  p=1;
  imgSrc="";
  developper:User;
  srcPdf="";
  etat=false;
  user:User;
  isChecked=true;
  myFormLogin:FormGroup;
  User:User=new User();
  submittedLogin:Boolean=false;
  Image:any;
  constructor(private router:Router,private toastr:ToastrService,private authService:AuthService, private projectService:ProjectService,private modalService: NgbModal) { }

  ngOnInit(): void {
    let id=Number(localStorage.getItem("idUser"));
    this.idUser=id;
    this.getAllUsers();
    this.user=new User();
    this.myFormLogin=new FormGroup({
      email:new FormControl("",[Validators.email,Validators.required]),
      password:new FormControl("",Validators.required),
      adress:new FormControl("",Validators.required),
      adress2:new FormControl("",Validators.required),
      area:new FormControl("",Validators.required),
      nom:new FormControl("",Validators.required),
      phone:new FormControl("",Validators.required),
      photo:new FormControl("",Validators.required),
      prenom:new FormControl("",Validators.required),
      
      state:new FormControl("",Validators.required),
      zipcode:new FormControl("",Validators.required),
    })
  }
  infos(idUser:Number,content:any){
    this.authService.getUserById(idUser).subscribe(res=>{
      this.user=res;
    })
    this.opencontent(content);

  }
  onFileSelected(event:any) {
    
    this.Image = event.target.files[0];
    const fileReader = new FileReader()
    fileReader.readAsDataURL(this.Image);
    fileReader.onload = () => {
      // You'll get the base64 string here
      
  

    let data={
      fileName:this.Image.name,
      fileType:this.Image.type,
      data:this.Image
    }
   
    this.user.photo=String(fileReader.result).replace("data:"+this.Image.type+";base64,", "");
    this.user.photoType=this.Image.type;
    this.user.photoName=this.Image.name;
    
    console.log(this.Image)
  }
  }

  
  getAllUsers(){
    this.authService.getAllUsers().subscribe(res=>{
      
      this.users=res.filter(item=>item.role=="CLIENTS");
    })
  }
  activateAccount(idUser:Number){
    this.authService.getUserById(idUser).subscribe(res=>{
     this.user=res;

    })
    if(this.user.etat){
      this.user.etat=false;
    }else{
      this.user.etat=true;
    }
    this.authService.updateProfile(this.user,idUser).subscribe(res=>{
      
      this.toastr.success("Client activated","Admin notification")

    },()=>this.toastr.error("You have an error please try again"))

  }
  image(img:any,fileType:any){
    this.imgSrc='data:'+fileType+';base64,' + img;
    return this.imgSrc;
  }
  onImgError(event:any){
    event.target.src ="assets/img/empty.jpg";
    
  }
  showpdf(pdf:any,fileType:any){
    this.srcPdf='data:'+fileType+';base64,' + pdf;
    return this.srcPdf;
  }
  opencontent(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res:any) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.getAllUsers();
      this.developper=new User();
    });
  }
  displayPdf(idUser:Number,content:any){
    this.authService.getUserById(idUser).subscribe(res=>{
      this.developper=res;
    })
    this.opencontent(content);
  }

  signup(){
    
    this.user.role="CLIENTS";
    this.submittedLogin = true;
    if (this.myFormLogin.invalid) {
      return;
    }
    this.authService.signup(this.user).subscribe(res=>{
      this.toastr.success("User added successfuly !","Create account notification");
      this.getAllUsers();
    },()=>this.toastr.error("Error please try again !","Create account notification"));
  }

  onError(error: any,content:any) {
    // do anything
    this.close(content);

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No cv exist !'
    })
  }

  close(content:any) {
    this.getAllUsers();
    this.user=new User();
    this.modalService.dismissAll(content);
  }
  deleteUser(id:Number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.authService.deleteUserById(id).subscribe(res=>{
          
        },()=>{swalWithBootstrapButtons.fire('Deleted!','Account has been deleted.','success')
          this.getAllUsers();
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
       
      }
    })
  }
}

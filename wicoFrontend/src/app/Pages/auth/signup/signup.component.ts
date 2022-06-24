import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/Model/User';
import { AuthService } from 'src/app/core/Services/user/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myFormLogin:FormGroup;
  user:User=new User();
  submittedLogin:Boolean=false;
  image:any;
  Pdf:any;
  srcPdf="";
  selectedRole="";
  constructor(private authentificationService:AuthService,
    private formBuilder: FormBuilder,private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    let role =localStorage.getItem('role');
    if(role!=null){
      if(role=="CLIENTS"){
        this.router.navigate(['/client']);
      }else if(role=="PERSONNELS"){
        this.router.navigate(['/personnel']);
      }else{
        this.router.navigate(['/admin']);
      }
    } 
    this.user=new User();
    this.myFormLogin=new FormGroup({
      email:new FormControl("",[Validators.email,Validators.required]),
      password:new FormControl("",Validators.required),
      adress:new FormControl("",Validators.required),
      adress2:new FormControl(""),
      area:new FormControl("",Validators.required),
      nom:new FormControl("",Validators.required),
      
      photo:new FormControl("",Validators.required),
      prenom:new FormControl("",Validators.required),
      role:new FormControl("",Validators.required),
      state:new FormControl("",Validators.required),
      phone:new FormControl("",[Validators.required,Validators.pattern("^[0-9]{8}$")]),
      zipcode:new FormControl("",[Validators.required,Validators.pattern("^[0-9]{4,5}$")]),
      pdf:new FormControl("")

    })
  }
  selectRole(event:any){
    this.selectedRole=event.target.value;
  }
  pdf(event:any) {
    
    this.Pdf = event.target.files[0];
    
    if(this.Pdf.type!="application/pdf"){
      this.toastr.error("This is not a pdf file");
      return;
    }
    const fileReader = new FileReader()
    fileReader.readAsDataURL(this.Pdf);
    fileReader.onload = () => {
    
    this.user.cvpdf=String(fileReader.result).replace("data:"+this.Pdf.type+";base64,", "");
    this.user.cvpdfType=this.Pdf.type;
    this.user.cvpdfName=this.Pdf.name;
    console.log(this.user)
  }
  
  }
  onFileSelected(event:any) {
    
    this.image = event.target.files[0];
    const fileReader = new FileReader()
    fileReader.readAsDataURL(this.image);
    fileReader.onload = () => {
      // You'll get the base64 string here
      
  

    let data={
      fileName:this.image.name,
      fileType:this.image.type,
      data:this.image
    }
   
    this.user.photo=String(fileReader.result).replace("data:"+this.image.type+";base64,", "");
    this.user.photoType=this.image.type;
    this.user.photoName=this.image.name;
    
    console.log(this.image)
  }
  }
  signup(){
    
    this.user.role=this.myFormLogin.controls['role'].value;
    this.submittedLogin = true;
    if (this.myFormLogin.invalid) {
      return;
    }
    this.authentificationService.signup(this.user).subscribe(res=>{
      this.toastr.success("User added successfuly !","Create account notification");
      this.router.navigate(['/login'])
    },()=>this.toastr.error("Error please try again !","Create account notification"));
  }
}

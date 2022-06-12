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
      adress2:new FormControl("",Validators.required),
      area:new FormControl("",Validators.required),
      nom:new FormControl("",Validators.required),
      phone:new FormControl("",Validators.required),
      photo:new FormControl("",Validators.required),
      prenom:new FormControl("",Validators.required),
      role:new FormControl("",Validators.required),
      state:new FormControl("",Validators.required),
      zipcode:new FormControl("",Validators.required),

    })
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
    },()=>this.toastr.error("Error please try again !","Create account notification"));
  }
}

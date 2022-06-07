import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/Model/User';
import { AuthService } from 'src/app/core/Services/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myFormLogin:FormGroup
  user:User=new User();
  public curUser= new BehaviorSubject(this.user);
  sharedUser = this.curUser.asObservable();
  submittedLogin:Boolean=false;
  users:User;
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
    this.users=new User();
    this.myFormLogin=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
   
  }
  


  login(){
    this.submittedLogin = true;
    if (this.myFormLogin.invalid) {
      return;
    }

    this.authentificationService.login(this.myFormLogin.value).subscribe(res=>{

      this.authentificationService.loginwidhoutObservable(this.myFormLogin.value).subscribe();

      localStorage.setItem("User",JSON.stringify(res));
      localStorage.setItem("role",res.role);
      localStorage.setItem("email",res.email);
      localStorage.setItem("idUser",String(res.id));
      if(res.role=="CLIENTS") {
        this.router.navigate(['/client']).then(() => {
          window.location.reload();
        });
      }else if(res.role=="PERSONNELS"){
        this.router.navigate(['/personnel']).then(() => {
          window.location.reload();
        });
      }else if(res.role=="ADMIN"){
        this.router.navigate(['/admin']).then(() => {
          window.location.reload();
        });
      };

    },(err)=>{ this.toastr.error("Login failed try again","Authentification error")})
    
  }
}

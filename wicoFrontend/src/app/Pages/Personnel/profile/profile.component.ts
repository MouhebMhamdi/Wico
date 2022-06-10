import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/Model/User';
import { AuthService } from 'src/app/core/Services/user/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imgSrc="";
  idUser:Number;
  user:User;
  constructor(private userService:AuthService) { }

  ngOnInit(): void {
    let id=Number(localStorage.getItem("idUser"));
    this.idUser=id;
    this.getUserConnect();
  }

  getUserConnect(){
    this.userService.getUserById(this.idUser).subscribe(res=>{
      this.user=res;
    })
  }
  image(img:any,fileType:any){
    this.imgSrc='data:'+fileType+';base64,' + img;
    return this.imgSrc;
  }
}

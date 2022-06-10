import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/Model/User';
import { AuthService } from 'src/app/core/Services/user/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:User;
  data:any;
  imgSrc="";
  Nom:String="";
  idUser:Number;
  Prenom:String;
  role:String;
  constructor(private route: ActivatedRoute,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    let id=Number(localStorage.getItem("idUser"));
    this.idUser=id;
    this.getUserConnect();
    this.role=String(localStorage.getItem("role"));
    this.Nom=String(localStorage.getItem("Nom"));
    this.Prenom=String(localStorage.getItem("Prenom"));
    this.route.fragment.subscribe(f => {
      const element = document.querySelector("#" + f)
      if (element){ 
        element.scrollIntoView()
        
      }
      
    })
    this.authService.sharedUser.subscribe((data:User)=>
        {this.user=data},
        ()=>{},
        ()=>{this.user = new User()}
    ) 
    this.data=localStorage.getItem("email");
    this.loadJsFile("assets/js/scripts.js"); 
  }
  getUserConnect(){
    this.authService.getUserById(this.idUser).subscribe(res=>{
      this.user=res;
    })
  }
  image(img:any,fileType:any){
    this.imgSrc='data:'+fileType+';base64,' + img;
    return this.imgSrc;
  }
  onImgError(event:any){
    event.target.src ="assets/img/empty.jpg";
    
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });

  }
  public loadJsFile(url:any) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  


  
}

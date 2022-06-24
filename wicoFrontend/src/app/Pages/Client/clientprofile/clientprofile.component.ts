import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/Model/User';
import { AuthService } from 'src/app/core/Services/user/auth.service';
@Component({
  selector: 'app-clientprofile',
  templateUrl: './clientprofile.component.html',
  styleUrls: ['./clientprofile.component.css']
})
export class ClientprofileComponent implements OnInit {
  imgSrc="";
  idUser:Number;
  myFormLogin:FormGroup;
  user:User=new User();
  submittedLogin:Boolean=false;
  Image:any;
  Pdf:any;
  srcPdf="";
  constructor(private userService:AuthService,private authentificationService:AuthService,
    private formBuilder: FormBuilder,private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    let id=Number(localStorage.getItem("idUser"));
    this.idUser=id;
    this.getUserConnect();

    let role =localStorage.getItem('role');
    if(role==null){
        this.router.navigate(['/login']);
    } 
    this.user=new User();
    this.myFormLogin=new FormGroup({
      email:new FormControl(this.user.email,[Validators.email,Validators.required]),
      adress:new FormControl(this.user.adress,Validators.required),
      adress2:new FormControl(this.user.adress2),
      area:new FormControl(this.user.area,Validators.required),
      nom:new FormControl(this.user.nom,Validators.required),
      
      photo:new FormControl(this.user.photo),
      prenom:new FormControl(this.user.prenom,Validators.required),
      state:new FormControl(this.user.state,Validators.required),
      
      pdf:new FormControl(this.user.cvpdf),
      phone:new FormControl("",[Validators.required,Validators.pattern("^[0-9]{8}$")]),
      zipcode:new FormControl("",[Validators.required,Validators.pattern("^[0-9]{4,5}$")]),
    })
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
  showpdf(pdf:any,fileType:any){
    this.srcPdf='data:'+fileType+';base64,' + pdf;
    return this.srcPdf;
  }
  onFileSelected(event:any) {
    
    this.Image = event.target.files[0];
  
    const fileReader = new FileReader()
    fileReader.readAsDataURL(this.Image);
    fileReader.onload = () => {
    
    let data={
      fileName:this.Image.name,
      fileType:this.Image.type,
      data:this.Image
    }
    this.user.photo=String(fileReader.result).replace("data:"+this.Image.type+";base64,", "");
    this.user.photoType=this.Image.type;
    this.user.photoName=this.Image.name;
    console.log(this.user)
  }
  
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
  updateProfile(){
    this.submittedLogin = true;
    console.log(this.myFormLogin.value);
    if (this.myFormLogin.invalid) {
      return;
    }
  
      this.authentificationService.updateProfile(this.user,this.idUser).subscribe(res=>{
        this.toastr.success("Profile updated","Client notification");
      },()=>this.toastr.error("Error","Client notification"))
  }

}

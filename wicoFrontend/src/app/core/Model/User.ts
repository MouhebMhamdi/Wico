import { Cv } from "./Cv";
import { Projects } from "./Projects";

export class User{
    adress: string;
    Adress2:String;
    zipcode:Number;
    state:String;
    area:String;
    email: any;
    etat: Boolean;
    id: Number;
    nom: string;
    password:string;
    phone: Number;
    photo: any;
    photoName:String;
    photoType:String;
    prenom: string;
    role: any;
    projects:Projects[];
    cv:Cv;
      

  }
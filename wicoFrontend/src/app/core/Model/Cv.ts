import { Experience } from "./Experience";
import { Formation } from "./Formation";

export class Cv{
    id:Number;
    firstName:String;
    lastName:String;
    BirthDate:Date;
    Description:String;
    phone:Number;
    Adress:String;
    email:String;
    ActuelJobTitle:String;
    experience:Experience[];
    formations:Formation[];
}
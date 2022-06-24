import { Historique } from "./Historique";
import { Technologies } from "./Technologies";
import { User } from "./User";

export class Projects{
    deadLine: Date;
    id: Number;
    price: Number;
    startDate: Date;
    title: string;
    technologies:Technologies[];
    description:string;
    idDevelopper:Number;
    payed:Boolean;
    historique:Historique;
    penaliter:Number;
    finished:Boolean;
    projectLink:String;
    users:User;
  }  
import { Historique } from "./Historique";
import { Technologies } from "./Technologies";

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
  }  
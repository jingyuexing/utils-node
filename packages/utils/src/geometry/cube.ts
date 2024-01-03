import { IGeometry, IPoint } from "./geometry";

export class Cube implements IGeometry {
   width:number;
   height:number;
   long:number;
   points:IPoint[];
   constructor(width:number,height:number,long:number){
      this.width = width;
      this.height = height;
      this.long = long;
      this.points = []
   }
   get volume(){
      return this.width * this.height * this.long
   }
   get area(){
      return ((this.width * this.long) + (this.height * this.long) + (this.width * this.height)) * 2
   }
}

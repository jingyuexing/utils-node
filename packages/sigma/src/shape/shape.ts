export declare interface IPoint{
   x:number;
   y:number;
}
export declare interface IShape{
   isChange:boolean
   begin:IPoint;
   end?:IPoint;
   color:string;
   border?:{
      color:string;
      width:number
   }
   width:number;
   height:number;
   mouseEnter:boolean
   draw(ctx:CanvasRenderingContext2D):void
}

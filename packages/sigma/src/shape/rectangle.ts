import { IShape, IPoint } from "./shape";

export class Rectangle implements IShape{
   begin: IPoint;
   width: number;
   height: number;
   isChange: boolean;
   mouseEnter:boolean;
   end?: IPoint | undefined;
   color:string;
   border?:{color:string,width:number}
   constructor(begin:IPoint, width:number,height:number, color="#000"){
      this.begin = begin
      this.height = height;
      this.width = width;
      this.isChange = false;
      this.mouseEnter = false
      this.border = {
         color:"transparent",
         width:1,
      }
      this.end = {
         x: this.begin.x + width,
         y: this.begin.y + height
      }
      this.color = color
   }
   _mouseEnter(x:number,y:number){
      return (this.begin.x <= x && x <= (this.end as IPoint).x) && (this.begin.y <= y && y <= (this.end as IPoint).y)
   }
   get center():IPoint{
      return {
         x:Math.abs(this.begin.x - (this.end as IPoint).x) / 2,
         y:Math.abs(this.begin.y - (this.end as IPoint).y) / 2
      }
   }
   draw(ctx:CanvasRenderingContext2D): void {
      ctx.beginPath()
      ctx.moveTo(this.begin.x,this.begin.y)
      ctx.lineTo((this.end as IPoint).x,this.begin.y)
      ctx.lineTo((this.end as IPoint).x,(this.end as IPoint).y)
      ctx.lineTo((this.begin as IPoint).x,(this.end as IPoint).y)
      ctx.lineTo((this.begin as IPoint).x,(this.begin as IPoint).y)
      ctx.lineCap = "square"
      ctx.fillStyle = this.color
      ctx.fill()
      if(this.border){
         ctx.strokeStyle = this.border.color
         ctx.lineWidth = this.border.width
         ctx.stroke()
      }
      ctx.closePath()
   }
}

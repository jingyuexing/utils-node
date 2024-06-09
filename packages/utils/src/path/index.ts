import { format } from "../string";
import { isBrowser, isNode } from "../typeis"

const PathSymbol = Symbol("path")
const DelimiterSymbol = Symbol("delimiter")
export class Path {
   [PathSymbol]: string[] = [];

   constructor(p: string) {
      this[PathSymbol] = p.split(this[DelimiterSymbol]);
   }
   get [DelimiterSymbol](): string {
      if (isNode()) {
         return "/"
      }
      return "/"
   }

   toString(): string {
      return this.normalizePath(this[PathSymbol].join(this[DelimiterSymbol]));
   }

   get name(): string {

      let last = this[PathSymbol][this[PathSymbol].length - 1];
      const [name] = last.split(".")
      return name
   }

   // 获取父目录
   parent(): Path {
      const parts = [...this[PathSymbol]]
      parts.pop()
      return new Path(parts.join(this[DelimiterSymbol]) || this[DelimiterSymbol]);
   }

   // 获取扩展名
   get extension(): string {
      const last = this[PathSymbol][this[PathSymbol].length - 1];
      const dotIndex = last.lastIndexOf('.');
      return dotIndex !== -1 ? last.substring(dotIndex + 1) : this.name;
   }

   // 连接路径
   join(...paths: string[]): Path {
      const combined = [this[PathSymbol], ...paths].join(this[DelimiterSymbol]);
      return new Path(this.normalizePath(combined));
   }

   /**
    * [absolute description]
    * @return {Path} [description]
    */
   absolute(): Path {
      return new Path(this.normalizePath(this[PathSymbol].join(this[DelimiterSymbol])));
   }

   /**
    * [normalizePath description]
    * @param  {string} p [description]
    * @return {string}   [description]
    */
   normalizePath(p: string): string {
      const segments = p.split('/');
      const stack: string[] = [];

      for (const segment of segments) {
         if (segment === '.' || segment === '') continue;
         if (segment === '..') {
            stack.pop();
         } else {
            stack.push(segment);
         }
      }
      let root = "/"
      if (isBrowser()) {
         root = document.location.host
      }
      if (this[PathSymbol][0] === "") {
         stack.unshift("")
      }
      return stack.join(this[DelimiterSymbol])
   }
   /**
    * [path description]
    * @param {Record<string, string | number | boolean>} params [description]
    */
   path(params: Record<string, string | number | boolean>) {
      return new Path(this.normalizePath(format(this.toString(), params)))
   }
   read() {

   }
   readBuffer() {

   }
}

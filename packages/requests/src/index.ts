import axios, { Axios, type AxiosRequestConfig } from "axios"
import "reflect-metadata";
import { METAMETHOD } from "./constant";
function useRequest<T = any>(config?:AxiosRequestConfig<T>){
   let instanceAxios = new Axios(config)
   let getInstance = ()=>{
      return instanceAxios
   }
   return getInstance()
}

export function Get(url: string, query: Requests.Dict<string, any>): PropertyDecorator
export function Get(options: Requests.RequestOptions): PropertyDecorator
export function Get(...args: any[]) {
   return function(_target:object,property:string|symbol,description:PropertyDescriptor){
      Reflect.defineMetadata(METAMETHOD,"",_target)
   }
}

export function Post(options: Requests.RequestOptions): PropertyDecorator
export function Post(url: string, query: any, timeout: number, body: Requests.Dict<string, any>, auth: string): PropertyDecorator
export function Post(...args: any[]) {
   return function (target: object, property: string, description: PropertyDescriptor) {
   }
}

export function Put(options:Requests.RequestOptions):PropertyDecorator
export function Put(url: string, query: any, timeout: number, body: Requests.Dict<string, any>, auth: string):PropertyDecorator
export function Put(...args:any[]) {
   return function(_target:object,property:string|symbol,description:PropertyDescriptor){

   }
}


function Patch(options:Requests.RequestOptions):PropertyDecorator
function Patch(url: string, query: any, timeout: number, body: Requests.Dict<string, any>, auth: string):PropertyDecorator
function Patch(...args:any[]){
   return function(_target:object,property:string,description:PropertyDescriptor){

   }
}

function Head(options:Requests.RequestOptions):PropertyDecorator
function Head(url: string, query: any, timeout: number, body: Requests.Dict<string, any>, auth: string):PropertyDecorator
function Head(...args:any[]){
   return function(_target:object,property:string|symbol,description:PropertyDescriptor){

   }
}

function Delete(options:Requests.RequestOptions):PropertyDecorator
function Delete(url: string, query: any, timeout: number, body: Requests.Dict<string, any>, auth: string):PropertyDecorator
function Delete(...args:any[]){
   return function(_target:object,property:string|symbol,description:PropertyDescriptor){

   }
}

function Query():ParameterDecorator{
   return function(target: Object, propertyKey: string | symbol, parameterIndex: number){

   }
}

function Path():ParameterDecorator{
   return function(target: Object, propertyKey: string | symbol, parameterIndex: number){

   }
}

Head({
   headers:{
      m:"",
      s:"1"
   } ,
   url: ""
})
function name(){

}

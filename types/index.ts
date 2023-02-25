export interface User {
    id: number;
    name: string;
    email: string;
  }

 export interface ReturnPlatform_log {
    height: number;
    id: number;
    url: string;
    width: number;
}
export interface Versions {
  summary?:string;
}
export interface ReturnData {
    id: number;
    name: string;
    platform_logo: ReturnPlatform_log;
    versions:Versions[]
}
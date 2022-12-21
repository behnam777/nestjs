import {  IsInt, IsString } from "class-validator";

export class TaskModel {
  
  @IsString()
  name: string;

  @IsInt()
  duration: number;
 
}

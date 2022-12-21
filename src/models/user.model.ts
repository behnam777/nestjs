import { IsString, IsNumber, IsEmail } from "class-validator";

export enum IGrant {
  add = 0,
  multiply = 1,
  divide = 2,
  subtract = 3
}

export class UserModel {
  
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsNumber()
  grant: IGrant;
}

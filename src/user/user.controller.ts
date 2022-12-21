import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UnprocessableEntityException,
  Put,
  Get,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ParseIntPipe } from "class-validator";
import { UserModel } from "./../models";
import { UserEntity } from "../entities";
import { UserService } from "./user.service";
import {  DeleteResult } from "typeorm";


@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) { }



  @Put(':id')
  @UseGuards(AuthGuard("jwt"))
  async updateUser(@Param("id", ParseIntPipe) id: number, @Body() user: UserModel): Promise<UserEntity> {
    const userEntity = await this.userService.findById(id);
    if (!userEntity) { throw new UnprocessableEntityException(); }
    return await this.userService.create(userEntity, user);
  }


  @Delete(':id')
  @UseGuards(AuthGuard("jwt"))
  async destroy(@Param("id") id: number): Promise<DeleteResult> {
    const userEntity = await this.userService.findById(id);
    if (!userEntity) { throw new UnprocessableEntityException(); }
    return await this.userService.destroy(id);
  }
}

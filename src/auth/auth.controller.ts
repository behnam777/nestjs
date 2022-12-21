import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthModel } from './../models';
import { AuthService } from './auth.service';
import { UserService } from './../user';
import { UserEntity } from 'entities';
import {  DeleteResult } from "typeorm";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body(new ValidationPipe()) auth: AuthModel): Promise<string> {
    return this.authService.authenticate(auth);
  }

  @Post('logout')
  logout(@Body() userId: number): Promise<DeleteResult> {
    return this.userService.destroy(userId);
  }

}

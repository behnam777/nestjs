import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UnprocessableEntityException,
  Put,
  Get,
  Param,
  NotFoundException,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "roles.decorator";
import { RolesGuard } from "roles.guard";
import { TaskModel } from "../models";
import { TaskEntity } from "../entities";
import { TaskService } from "./task.service";

@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('add')
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("add")
  async addTask(@Body(new ValidationPipe()) taskModel: TaskModel): Promise<TaskEntity> { 
    return await this.taskService.add(taskModel);
  }

  
  @Post('multiply')
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("multiply")
  async multiply(@Body(new ValidationPipe()) taskModel: TaskModel): Promise<TaskEntity> { 
    return await this.taskService.multiply(taskModel);
  }

  @Post('divide')
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("divide")
  async divide(@Body(new ValidationPipe()) taskModel: TaskModel): Promise<TaskEntity> { 
    return await this.taskService.divide(taskModel);
  }

  @Post('subtract')
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("subtract")
  async subtract(@Body(new ValidationPipe()) taskModel: TaskModel): Promise<TaskEntity> { 
    return await this.taskService.subtract(taskModel);
  }

   
}

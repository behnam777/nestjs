import * as bcrypt from "bcrypt";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { ConfigService, InjectConfig } from "@nestjs/config";

import { TaskEntity as Task, TaskEntity } from "../entities";
import { TaskModel } from "../models";

@Injectable()
export class TaskService {
  private saltRounds: number;

  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectConfig() private readonly config: ConfigService
  ) { }

  async add(task: TaskModel): Promise<TaskEntity> {
    const userToCreate = { ...task };
    const result = await this.taskRepository.save(
      this.taskRepository.create(userToCreate)
    );
    return result;
  }
  async multiply(task: TaskModel): Promise<TaskEntity> {
    //multiply
  }
  async divide(task: TaskModel): Promise<TaskEntity> {
    //divide
  }
  async subtract(task: TaskModel): Promise<TaskEntity> {
    //subtract
  }
  async findById(id: number): Promise<TaskEntity | null> {
    return await this.taskRepository.findOneOrFail({id});
  }


  
}

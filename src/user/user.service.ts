import * as bcrypt from "bcrypt";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { ConfigService, InjectConfig } from "@nestjs/config";

import { UserEntity as User, UserEntity } from "./../entities";
import { UserModel } from "../models";

@Injectable()
export class UserService {
  private saltRounds: number;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectConfig() private readonly config: ConfigService
  ) {
    this.saltRounds = config.get("app.salt_rounds", 10);
  }

  async create(user: UserModel): Promise<User> {
    const userToCreate = {...user,password: await this.getHash(user.password),};
    const result = await this.userRepository.save(this.userRepository.create(userToCreate));
    return result;
  } 

  async findById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOneOrFail(id);
  }


  async getHash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async destroy(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async findByIdWithPassword(id: string): Promise<User> | null {
    return await this.userRepository.findOneBy({id});
  }
}

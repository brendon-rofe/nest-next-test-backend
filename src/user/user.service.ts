import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  createUser(data: any): Promise<User> {
    return this.userRepo.save(data as any);
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepo
      .createQueryBuilder('users')
      .getMany()
  }

  async deleteUser(id: any): Promise<DeleteResult> {
    return await this.userRepo.delete(id)
  }
}
import { Controller, UseInterceptors, Post, Body, Get, Delete, Param, Put } from "@nestjs/common";
import { TransformInterceptor } from "src/interceptors/transform.interceptor";
import { failedResponse, successResponse } from "src/jsonResponse";
import { UserService } from "./user.service";
import { User } from "./user.entity";


@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UserController {
  tempErrorWord = 'there are some errors'

  constructor(
    private userService: UserService
  ) {}

  @Post()
  async createUser(
    @Body('name') name: string,
    @Body('age') age: number
  ) {
    const user = await this. userService.createUser({ name, age })
    if (user) {
      return successResponse(user)
    }
    return failedResponse(this.tempErrorWord)
  }

  @Get()
  async getUsers() {
    const users = await this.userService.getAllUsers()
    if(users) {
      return successResponse(users)
    }
    return failedResponse(this.tempErrorWord)
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: any,
    @Body('name') name: string,
    @Body('age') age: number
    ) {
      const user = await this.userService.updateUser(id, { name, age });
    if (user) {
      return successResponse(user);
    }
    return failedResponse(this.tempErrorWord);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: Promise<any>) {
    const user = await this.userService.deleteUser(id)
  }

}
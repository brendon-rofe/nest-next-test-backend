import { Controller, UseInterceptors, Post, Body, Get } from "@nestjs/common";
import { TransformInterceptor } from "src/interceptors/transform.interceptor";
import { failedResponse, successResponse } from "src/jsonResponse";
import { UserService } from "./user.service";


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

}
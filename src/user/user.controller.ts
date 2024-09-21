
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ActiveUser } from 'src/Common/decorator/active-user.decorator';
import { ActiveUserInterface } from 'src/Common/interfaces/ActiveUserInterface';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Roles } from 'src/Common/interfaces/Roles';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Auth(Roles.user)
  @Get('profile')
  async profile(@ActiveUser() user:ActiveUserInterface){
    return this.userService.getProfile(user);
  }

  @Auth(Roles.admin)
  @Get()
  async findAll(@ActiveUser() user:ActiveUserInterface) {
    return this.userService.findAll(user);
  }


  @Auth(Roles.user)
  @Get(':id')
  async findOne(@Param('id' , ParseIntPipe) id: number , @ActiveUser() user:ActiveUserInterface) {
    return this.userService.findOne(id,user);
  }

}

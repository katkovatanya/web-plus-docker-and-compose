import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Request as IRequest } from 'express';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';

export interface RequestOwnUser extends IRequest {
  user: UserProfileResponseDto;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getOwnUser(@Request() req: RequestOwnUser) {
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  async updateOwnProfile(
    @Request() req: RequestOwnUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.updateOwnProfile(
      req.user.id,
      updateUserDto,
    );

    return user;
  }

  @UseGuards(JwtGuard)
  @Get('me/wishes')
  async getOwnWishes(@Request() req: RequestOwnUser) {
    return await this.usersService.getOwnWishes(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Post('find')
  findMany(@Body() findUsersDto: FindUsersDto) {
    return this.usersService.findMany(findUsersDto.query);
  }

  @UseGuards(JwtGuard)
  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.usersService.getUser(username);
    return user;
  }

  @UseGuards(JwtGuard)
  @Get(':username/wishes')
  async getUserWishes(@Param('username') username: string) {
    const user = await this.usersService.getUserWishes(username);
    return user;
  }
}

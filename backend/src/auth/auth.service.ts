import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInUserDto } from './dto/signin-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async loginUser(user: User) {
    const payload = { username: user.username, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUser(signInUserDto: SignInUserDto) {
    const user = await this.usersService.findOwnProfile(signInUserDto.username);
    const isMatch = await bcrypt.compare(signInUserDto.password, user.password);
    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  async register(username: string, password: string) {
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.authService.hashPassword(password);
    const newUser = new this.userModel({ username, password: hashedPassword });
    await newUser.save();
    return { message: 'User registered successfully' };
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await this.authService.comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = await this.authService.generateJwt({ id: user.id, username: user.username });
    return { token };
  }
}

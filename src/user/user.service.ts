import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from 'src/interfaces/jwt.payload.interfaces';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {

  private readonly logger = new Logger('TaskService');

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto) {
    try {

      

      const { password, ...userData } = createUserDto;

      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      const token = this.getJwtToken({
        email: user.email,
        user: user.user,
        id: user.id
      })

      return {
        token
      };
      
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userModel.findOne({ email })
      .select('-__v');
    
    if (!user)
      throw new UnauthorizedException('Credentials are not valid')

    if(!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid')

    const token = this.getJwtToken({
      email: user.email,
      user: user.user,
      id: user.id
    })
    
    return {
      token
     };

  }

  async findAll() {
    return this.userModel.find();
  }

 
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Error ${JSON.stringify(error.keyValue)}`);
    }
    
    this.logger.error(error);
    throw new InternalServerErrorException(`cant create the task - check server logs`) 
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}

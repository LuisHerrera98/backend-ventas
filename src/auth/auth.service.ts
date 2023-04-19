import { Injectable, BadRequestException, HttpStatus, HttpException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {

  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'matabobos2023@gmail.com',
        pass: 'xioawqljdhxyimgr',
      },
    });
  }

  async register(registerDto: RegisterDto) {
    try {
      registerDto.password = await hash(registerDto.password, 10);
      const user = await this.userModel.create(registerDto);
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Usuario ya registrado');
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userModel.findOne({ email: loginDto.email });
      if (!user) throw new BadRequestException('No se encontro el usuario');

      const validatePassword = await compare(loginDto.password, user.password);
      if (!validatePassword)
        throw new BadRequestException('credenciales invalidas');

      const token = sign(
        {
          email: loginDto.email,
        },
        process.env.SECRET_KEY,
      );

      return token;
    } catch (error) {
      throw new BadRequestException(error.response.message);
    }
  }

  async whoami(token) {
    if(!token) 
      throw new BadRequestException('missing token');
    try {
      const decoded: any = verify(token, process.env.SECRET_KEY);
      const user = await this.userModel.findOne({ email: decoded.email });
      return user;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'matabobos2023@gmail.com',
      to,
      subject,
      html,
    });
  }
  
  async verifyEmail(){

  }
  
  async forgotPassword(){

  }

}

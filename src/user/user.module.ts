import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/stategies/jwt.strategie';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: userSchema
    }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    })
  ],
  exports: [
    MongooseModule, JwtStrategy, PassportModule, JwtModule
  ]
})
export class UserModule {}

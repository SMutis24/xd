import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TaskModule,
    MongooseModule.forRoot(process.env.url_tasks),
    CommonModule,
    SeedModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

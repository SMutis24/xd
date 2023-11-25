import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, taskSchema } from './entities/task.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    MongooseModule.forFeature([{
      name: Task.name,
      schema: taskSchema
    }]),
    UserModule
  ],
  exports: [
    MongooseModule
  ]
})
export class TaskModule {}

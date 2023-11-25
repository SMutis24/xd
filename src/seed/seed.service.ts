import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('SeedService');

  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async executeSeed() {
    try {
      const filePath = 'src/seed/data/data.json';
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(rawData);

      const filePath2 = 'src/seed/data/user.json';
      const rawData2 = fs.readFileSync(filePath2, 'utf-8');
      const jsonData2 = JSON.parse(rawData2);

      const task = await this.taskModel.create(jsonData);
      const user = await this.userModel.create(jsonData2);

      return 'The seed was suceful';
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        `The execute the seed is fail error: ${error}`,
      );
    }
  }
}

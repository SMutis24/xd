import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TaskService {
  private readonly logger = new Logger('TaskService');

  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    createTaskDto.name = createTaskDto.name.toLocaleLowerCase();
    createTaskDto.owner = createTaskDto.owner.toLocaleLowerCase();
    createTaskDto.assigned = createTaskDto.assigned.toLocaleLowerCase();

    try {
      const task = await this.taskModel.create(createTaskDto);
      return task;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset, user, status } = paginationDto;

    let query: any = {};

    if (user !== undefined) {
      query.owner = user;
    }

    if (status !== undefined) {
      query.status = status;
    }

    return await this.taskModel
      .find(query)
      .limit(limit)
      .skip(offset)
      .sort({
        name: 1,
      })
      .select('-__v');
  }

  async findOne(id: string) {
    let task: Task;

    if (isValidObjectId(id)) {
      task = await this.taskModel.findById(id);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    let task = await this.findOne(id);

    if (updateTaskDto.name) {
      updateTaskDto.name = updateTaskDto.name.toLocaleLowerCase();
    }

    try {
      await this.taskModel.updateOne({ _id: id }, updateTaskDto);
      return { ...task.toJSON(), ...updateTaskDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.taskModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`task with id: ${id} not found`);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `task exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      `cant create the task - check server logs`,
    );
  }
}

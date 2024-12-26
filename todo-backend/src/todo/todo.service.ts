import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async addTask(task: string, username: string) {
    const newTask = new this.todoModel({ task, username });
    return await newTask.save();
  }
  
  async getTasks(username: string) {
    return await this.todoModel.find({ username });
  }

  async updateTask(id: string, isCompleted: boolean, task?: string) {
    const updateFields: Record<string, any> = { isCompleted };
    if (task) {
      updateFields['task'] = task;
    }
    return await this.todoModel.findByIdAndUpdate(id, updateFields, { new: true });
  }

  async deleteTask(id: string) {
    return await this.todoModel.findByIdAndDelete(id);
  }
}

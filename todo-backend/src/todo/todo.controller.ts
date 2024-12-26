import { Controller, Post, Get, Patch, Delete, Body, Query } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('add')
  async addTask(@Body('task') task: string, @Body('username') username: string) {
    return this.todoService.addTask(task, username);
  }
  
  @Get()
  async getTasks(@Query('username') username: string) {
    if (!username) {
      throw new Error('Username is required.');
    }
    return this.todoService.getTasks(username);
  }
  
  @Patch('update')
  async updateTask(
    @Query('id') id: string, 
    @Body('isCompleted') isCompleted: boolean,
    @Body('task') task: string
  ) {
    return this.todoService.updateTask(id, isCompleted, task);
  }

  @Delete('delete')
  async deleteTask(@Query('id') id: string) {
    if (!id) {
      throw new Error('Task ID is required.');
    }
    return this.todoService.deleteTask(id);
  }
}

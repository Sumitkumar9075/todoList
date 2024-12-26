import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sumitzecotok1:SpPbF6VqbmYUEXQP@cluster0.lng5v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    UserModule,
    AuthModule,
    TodoModule,
  ],
})
export class AppModule {}

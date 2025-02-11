import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRestController } from './user.rest.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController, UserRestController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
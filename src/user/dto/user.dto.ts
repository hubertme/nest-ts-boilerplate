import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserRole, UserStatus } from '../../proto/generated/user.pb';

export class UserDto {
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: string;

  @ApiProperty({ description: 'The email address of the user' })
  email: string;

  @ApiProperty({ description: 'The full name of the user' })
  fullName: string;

  @ApiProperty({ enum: UserRole, description: 'The role of the user' })
  role: UserRole;

  @ApiProperty({ enum: UserStatus, description: 'The status of the user' })
  status: UserStatus;

  @ApiProperty({ description: 'The timestamp when the user was created' })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({ description: 'The timestamp when the user was last updated' })
  @Type(() => Date)
  updatedAt: Date;
}

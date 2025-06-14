import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';

export class AuthResponse {
  @ApiProperty()
  token: string;

  @ApiProperty({ type: () => User })
  user: User;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'teste@teste.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  senha: string;
}

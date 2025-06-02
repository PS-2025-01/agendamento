import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'teste' })
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: '12345678901' })
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ example: 'teste@teste.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  senha: string;
}

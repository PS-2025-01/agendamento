import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEspecialidadeDto {
  @ApiProperty({ example: 'cardiologista' })
  @IsNotEmpty({
    message: 'nome da especialidade não pode ser branco',
  })
  nome: string;
}

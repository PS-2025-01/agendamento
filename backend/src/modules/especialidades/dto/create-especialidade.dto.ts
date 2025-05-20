import { IsNotEmpty } from 'class-validator';

export class CreateEspecialidadeDto {
  @IsNotEmpty({
    message: 'nome da especialidade não pode ser branco',
  })
  nome: string;
}

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEspecialidadeDto {
  @IsString({ message: 'O nome precisa ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;
}

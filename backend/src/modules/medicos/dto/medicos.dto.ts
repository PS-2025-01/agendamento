import { ApiProperty } from '@nestjs/swagger';
import { Medico } from '../entities/medico.entity';

export class MedicoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  especialidade: string;

  @ApiProperty()
  especialidadeId: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  constructor(medico: Medico) {
    this.id = medico.id;
    this.especialidade = medico.especialidade.nome;
    this.especialidadeId = medico.especialidade.id;
    this.nome = medico.usuario.nome;
    this.email = medico.usuario.email;
  }
}

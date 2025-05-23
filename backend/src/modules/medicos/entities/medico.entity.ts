import { Especialidade } from '../../especialidades/entities/especialidade.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Medico {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Especialidade, (especialidade) => especialidade.medicos)
  especialidade: Especialidade;
}

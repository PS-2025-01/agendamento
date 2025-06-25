import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Especialidade } from '../../especialidades/entities/especialidade.entity';
import { Agendamento } from '../../agendamentos/entities/agendamento.entity';

@Entity()
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Especialidade, (especialidade) => especialidade.medicos)
  especialidade: Especialidade;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.medico)
  agendamentos: Agendamento[];

  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario: Usuario;
}

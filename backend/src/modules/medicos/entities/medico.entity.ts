import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Especialidade } from '../../especialidades/entities/especialidade.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Especialidade, (especialidade) => especialidade.medicos)
  especialidade: Especialidade;

  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario: Usuario;
}

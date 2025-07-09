import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Medico } from '../../medicos/entities/medico.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { AgendamentoStatus } from './agendamentoStatus.enum';

@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  horario: string;

  @Column({ type: 'date' })
  data: Date;

  @Column({ enum: AgendamentoStatus, type: 'enum' })
  status: AgendamentoStatus;

  @ManyToOne(() => Medico)
  medico: Medico;

  @ManyToOne(() => Usuario)
  paciente: Usuario;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}

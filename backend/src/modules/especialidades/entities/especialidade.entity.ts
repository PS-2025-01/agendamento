import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Medico } from '../../medicos/entities/medico.entity';

@Entity()
export class Especialidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @OneToMany(() => Medico, (medico) => medico.especialidade)
  medicos: Medico[];
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Medico } from '../../medicos/entities/medico.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Medico)
  medico: Medico;

  @Column()
  dia: number;

  @Column({ type: 'time' })
  inicio: string;

  @Column({ type: 'time' })
  fim: string;

  @Column()
  intervalo: number;
}

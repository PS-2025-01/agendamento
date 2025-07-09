import { Column, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TipoUsuario } from './tipoUsuario.enum';
import { Medico } from 'src/modules/medicos/entities/medico.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: TipoUsuario,
    default: TipoUsuario.PACIENTE,
  })
  tipoUsuario: TipoUsuario;

  @Column()
  senha: string;

  @OneToOne(() => Medico, medico => medico.usuario)
  medico: Medico | null;
  
  @DeleteDateColumn()
  deletedAt: Date | null;
}

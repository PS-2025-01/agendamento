import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TipoUsuario } from './tipoUsuario.enum';

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
}

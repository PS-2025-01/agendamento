import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('especialidades')
@Unique(['nome']) 
export class Especialidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
}

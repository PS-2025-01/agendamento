import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['nome']) 
export class Especialidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
}

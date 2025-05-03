import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Especialidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;
}

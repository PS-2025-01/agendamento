import { ApiProperty } from "@nestjs/swagger";
import { Especialidade } from "../entities/especialidade.entity";

export class EspecialidadeDto {
    @ApiProperty({ example: 1 })
    id: number;
    
    @ApiProperty({ example: 'cardiologista' })
    nome: string;

    constructor(especialidade: Especialidade) {
        this.id = especialidade.id;
        this.nome = especialidade.nome;
    }
}
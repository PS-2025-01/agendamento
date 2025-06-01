import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Grade } from "../entities/grade.entity";

export class CreateGradeResponseDto {
      @ApiProperty({ example: 1 })
      @IsNumber()
      id: number;

      @ApiProperty({ example: 1 })
      @IsNumber()
      medicoId: number;

      @ApiProperty({ example: 0 })
      @IsNumber()
      dia: number;
    
      @ApiProperty({ example: '08:00' })
      @IsString()
      inicio: string;
    
      @ApiProperty({ example: '18:00' })
      @IsString()
      fim: string;
    
      @ApiProperty({ example: 30 })
      @IsNumber()
      intervalo: number;

      constructor(grade: Grade) {
            this.id = grade.id;
            this.medicoId = grade.medico.id;
            this.dia = grade.dia;
            this.inicio = grade.inicio;
            this.fim = grade.fim;
            this.intervalo = grade.intervalo;
      }
}
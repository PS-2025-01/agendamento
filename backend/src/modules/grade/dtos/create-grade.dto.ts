import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateGradeDto {
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
}
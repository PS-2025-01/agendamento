import { ApiProperty } from '@nestjs/swagger';

export class CreateAgendamentoDto {
  @ApiProperty({ example: 1 })
  medicoId: number;

  @ApiProperty({ example: '2025-06-16' })
  data: string;

  @ApiProperty({ example: '10:30' })
  horario: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Agendamento } from '../entities/agendamento.entity';
import { AgendamentoStatus } from '../entities/agendamentoStatus.enum';

export class ListAgendamentoResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '10:30' })
  horario: string;

  @ApiProperty({ example: new Date() })
  data: Date;

  @ApiProperty({ example: AgendamentoStatus.AGENDADO })
  status: AgendamentoStatus;

  @ApiProperty()
  medico: string;

  @ApiProperty({ example: 1 })
  medicoId: number;

  @ApiProperty()
  paciente: string;

  @ApiProperty({ example: 1 })
  pacienteId: number;

  constructor(agendamento: Agendamento) {
    this.id = agendamento.id;
    this.horario = agendamento.horario;
    this.data = agendamento.data;
    this.status = agendamento.status;
    this.medico = agendamento.medico.usuario.nome;
    this.medicoId = agendamento.medico.id;
    this.paciente = agendamento.paciente.nome;
    this.pacienteId = agendamento.paciente.id;
  }
}

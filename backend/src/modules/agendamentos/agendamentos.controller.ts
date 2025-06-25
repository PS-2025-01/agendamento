import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { AgendamentosService } from './agendamentos.service';
import { AuthService } from '../auth/auth.service';
import { AgendamentoResponseDto } from './dtos/agendamento-response.dto';
import { CreateAgendamentoDto } from './dtos/create-agendamento.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('agendamentos')
export class AgendamentosController {
  private logger = new Logger(AgendamentosController.name);
  constructor(
    private readonly agendamentosService: AgendamentosService,
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({ type: [AgendamentoResponseDto] })
  @ApiOperation({
    description: `
      MEDICOS: lis  ta os agendamentos que o medico vai atender.
      PACIENTE: lista os agendamentos do paciente.
      ADMIN: lista todos os agendamentos.
    `,
  })
  @Get()
  async list(@User() userId: string) {
    const usuario = await this.authService.getUserById(Number(userId));
    const agendamentos = await this.agendamentosService.list(usuario);
    this.logger.log(agendamentos);
    return agendamentos.map(
      (agendamento) => new AgendamentoResponseDto(agendamento),
    );
  }

  @ApiCreatedResponse({ type: AgendamentoResponseDto })
  @ApiOperation({
    description: `
      Apenas usuarios PACIENTE podem agendar.
    `,
  })
  @Post()
  async create(@Body() body: CreateAgendamentoDto, @User() userId: string) {
    const usuario = await this.authService.getUserById(Number(userId));
    const agendamento = await this.agendamentosService.create(body, usuario);
    return new AgendamentoResponseDto(agendamento);
  }
}

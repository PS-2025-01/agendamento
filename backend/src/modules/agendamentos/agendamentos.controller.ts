import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { AgendamentosService } from './agendamentos.service';
import { AuthService } from '../auth/auth.service';
import { AgendamentoResponseDto } from './dtos/agendamento-response.dto';
import { CreateAgendamentoDto } from './dtos/create-agendamento.dto';
import { ListAgendamentoResponseDto } from './dtos/listAgendamento-response.dto copy';
import { Role } from 'src/common/decorators/role.decorator';
import { TipoUsuario } from '../usuarios/entities/tipoUsuario.enum';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('agendamentos')
export class AgendamentosController {
  private logger = new Logger(AgendamentosController.name);
  constructor(
    private readonly agendamentosService: AgendamentosService,
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({ type: [ListAgendamentoResponseDto] })
  @ApiOperation({
    description: `
      MEDICOS: lista os agendamentos que o medico vai atender.
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
      (agendamento) => new ListAgendamentoResponseDto(agendamento),
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

  @ApiOkResponse({ type: AgendamentoResponseDto })
  @ApiOperation({
    description: `
      Apenas usuarios MEDICO podem concluir.
    `,
  })
  @Role(TipoUsuario.MEDICO)
  @Patch(':id/done')
  async done(@Param('id') id: string) {
    const agendamento = await this.agendamentosService.done(Number(id));
    return new AgendamentoResponseDto(agendamento);
  }

  @ApiOkResponse({ type: AgendamentoResponseDto })
  @Role(TipoUsuario.MEDICO, TipoUsuario.PACIENTE)
  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    const agendamento = await this.agendamentosService.cancel(Number(id));
    return new AgendamentoResponseDto(agendamento);
  }

  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.agendamentosService.delete(Number(id));
  }
}

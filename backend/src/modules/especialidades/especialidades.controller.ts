import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EspecialidadesService } from './especialidades.service';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { EspecialidadeDto } from './dto/especialidade.dto';

@ApiBearerAuth()
@ApiTags('Especialidades')
@UseGuards(JwtAuthGuard)
@Controller('especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @ApiOperation({ summary: 'cadastrar nova especialidade' })
  @ApiCreatedResponse({ type: CreateEspecialidadeDto })
  @Post()
  create(@Body() createEspecialidadeDto: CreateEspecialidadeDto) {
    return this.especialidadesService.create(createEspecialidadeDto.nome);
  }

  @ApiOperation({ summary: 'Listar as especialidades disponiveis' })
  @ApiOkResponse({ type: [EspecialidadeDto] })
  @Get()
  async findAll() {
    const especialidades = await this.especialidadesService.findAll();
    return especialidades.map(
      (especialidade) => new EspecialidadeDto(especialidade),
    );
  }
}

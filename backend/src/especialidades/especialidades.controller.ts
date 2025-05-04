import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @Post()
  create(@Body() createEspecialidadeDto: CreateEspecialidadeDto) {
    return this.especialidadesService.create(createEspecialidadeDto.nome);
  }

  @Get()
  findAll() {
    return this.especialidadesService.findAll();
  }
}

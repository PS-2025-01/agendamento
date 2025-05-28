import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MedicoDto } from './dto/medicos.dto';
import { MedicosService } from './medicos.service';

@ApiTags('Medicos')
@Controller('medicos')
export class MedicosControlller {
  constructor(private medicosService: MedicosService) {}

  @ApiQuery({ name: 'nome', required: false })
  @ApiQuery({ name: 'especialidade', required: false })
  @ApiOkResponse({ type: [MedicoDto] })
  @Get()
  async findAll(
    @Query('nome') nome?: string,
    @Query('especialidade') especialidade?: string,
  ) {
    const medicos = await this.medicosService.list(nome, especialidade);
    return medicos.map((medico) => new MedicoDto(medico));
  }
}

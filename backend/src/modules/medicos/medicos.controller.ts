import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MedicoDto } from './dto/medicos.dto';
import { MedicosService } from './medicos.service';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';

@ApiBearerAuth()
@ApiTags('Médicos')
@UseGuards(JwtAuthGuard)
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

  @ApiOkResponse({ type: MedicoDto })
  @Get('current')
  async current(@User() userId: string) {
    const medico = await this.medicosService.findByUserId(Number(userId));
    return new MedicoDto(medico);
  }
}

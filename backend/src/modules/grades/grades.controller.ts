import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GradesService } from './grades.service';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { CreateGradeDto } from './dtos/create-grade.dto';
import { CreateGradeResponseDto } from './dtos/create-grade-response.dto';
import { User } from '../../common/decorators/user.decorator';
import { Role } from '../../common/decorators/role.decorator';
import { TipoUsuario } from '../usuarios/entities/tipoUsuario.enum';

@ApiTags('Grades')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/grades')
export class GradesController {
  constructor(private gradeService: GradesService) {}

  @ApiQuery({ name: 'medicoId', example: 1 })
  @ApiQuery({ name: 'data', example: '2025-05-25' })
  @ApiOkResponse({ type: [String] })
  @Get('horarios')
  async horarios(
    @Query('medicoId') medicoId: string,
    @Query('data') data: string,
  ) {
    if (!medicoId || !data) {
      throw new BadRequestException('MedicoId e data sao obrigatorios.');
    }

    return await this.gradeService.available(Number(medicoId), new Date(data));
  }

  @ApiCreatedResponse({ type: CreateGradeDto })
  @Post()
  @Role(TipoUsuario.MEDICO)
  async create(@Body() body: CreateGradeDto, @User() userId: string) {
    const grade = await this.gradeService.create(body, Number(userId));
    return new CreateGradeResponseDto(grade);
  }
}

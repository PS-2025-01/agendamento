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
import { GradeService } from './grade.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { CreateGradeDto } from './dtos/create-grade.dto';
import { CreateGradeResponseDto } from './dtos/create-grade-response.dto';
import { User } from 'src/common/decorators/user.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { TipoUsuario } from '../usuario/entities/tipoUsuario.enum';

@ApiTags('Grades')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/grades')
export class GradeController {
  constructor(private gradeService: GradeService) {}

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

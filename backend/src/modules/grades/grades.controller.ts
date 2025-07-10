import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GradesService } from './grades.service';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { CreateGradeDto } from './dtos/create-grade.dto';
import { GradeResponseDto } from './dtos/grade-response';
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

  @ApiCreatedResponse({ type: GradeResponseDto })
  @Post()
  @Role(TipoUsuario.MEDICO)
  async create(@Body() body: CreateGradeDto, @User() userId: string) {
    const grade = await this.gradeService.create(body, Number(userId));
    return new GradeResponseDto(grade);
  }

  @ApiOkResponse({ type: [GradeResponseDto] })
  @ApiQuery({ name: 'medicoId', example: 1 })
  @Get()
  async grades(@Query('medicoId') medicoId: string) {
    const grades = await this.gradeService.listByMedicoId(Number(medicoId));
    return grades.map((grade) => new GradeResponseDto(grade));
  }

  @ApiOkResponse({ type: GradeResponseDto })
  @Patch(':id')
  async update(@Param('id') gradeId: string, @Body() body: CreateGradeDto) {
    const grade = await this.gradeService.update(Number(gradeId), body);
    return new GradeResponseDto(grade);
  }

  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async Delete(@Param('id') gradeId: string) {
    await this.gradeService.delete(Number(gradeId));
  }
}

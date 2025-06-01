import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { GradeController } from './grade.controller';
import { MedicosModule } from '../medicos/medicos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Grade]), MedicosModule],
  providers: [GradeService],
  controllers: [GradeController],
})
export class GradeModule {}

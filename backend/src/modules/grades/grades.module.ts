import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { GradesController } from './grades.controller';
import { MedicosModule } from '../medicos/medicos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Grade]), MedicosModule],
  providers: [GradesService],
  controllers: [GradesController],
})
export class GradesModule {}

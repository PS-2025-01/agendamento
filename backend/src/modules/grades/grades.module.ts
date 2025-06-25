import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { GradesController } from './grades.controller';
import { MedicosModule } from '../medicos/medicos.module';
import { AgendamentosModule } from '../agendamentos/agendamentos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grade]),
    MedicosModule,
    AgendamentosModule,
  ],
  providers: [GradesService],
  controllers: [GradesController],
})
export class GradesModule {}

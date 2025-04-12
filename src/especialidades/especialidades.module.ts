import { Module } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { EspecialidadesController } from './especialidades.controller';
import { especialidadesProviders } from '../database/entities/especialidades.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EspecialidadesController],
  providers: [...especialidadesProviders, EspecialidadesService],
})
export class EspecialidadesModule {}

import { Module } from '@nestjs/common';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [EspecialidadesModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

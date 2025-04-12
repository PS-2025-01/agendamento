import { Module } from '@nestjs/common';
import { EspecialidadesModule } from './especialidades/especialidades.module';

@Module({
  imports: [EspecialidadesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

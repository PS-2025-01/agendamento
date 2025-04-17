import { Module } from '@nestjs/common';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot(options), EspecialidadesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

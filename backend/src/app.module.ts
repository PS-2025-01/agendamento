import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from './database/data-source';
import { EspecialidadesModule } from './modules/especialidades/especialidades.module';
import { AuthModule } from './modules/auth/auth.module';
import { GradesModule } from './modules/grades/grades.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    EspecialidadesModule,
    AuthModule,
    GradesModule,
  ],
})
export class AppModule {}

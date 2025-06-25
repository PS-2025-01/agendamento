import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from './database/data-source';
import { EspecialidadesModule } from './modules/especialidades/especialidades.module';
import { AuthModule } from './modules/auth/auth.module';
import { GradesModule } from './modules/grades/grades.module';
import { AgendamentosModule } from './modules/agendamentos/agendamentos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    EspecialidadesModule,
    AuthModule,
    GradesModule,
    AgendamentosModule,
  ],
})
export class AppModule {}

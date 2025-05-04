import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from './data-source';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(options), EspecialidadesModule, AuthModule],
})
export class AppModule {}

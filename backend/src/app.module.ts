import { Module } from '@nestjs/common';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from './data-source';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    EspecialidadesModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

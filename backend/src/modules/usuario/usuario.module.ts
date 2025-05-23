import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { RegisterUsuarioService } from './register-usuario.service';
import { EspecialidadesModule } from '../especialidades/especialidades.module';
import { MedicosModule } from '../medicos/medicos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    EspecialidadesModule,
    MedicosModule,
  ],
  providers: [UsuarioService, RegisterUsuarioService],
  exports: [UsuarioService, RegisterUsuarioService],
})
export class UsuarioModule {}

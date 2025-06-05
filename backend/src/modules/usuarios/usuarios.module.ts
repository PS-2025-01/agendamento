import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { RegisterUsuariosService } from './register-usuarios.service';
import { EspecialidadesModule } from '../especialidades/especialidades.module';
import { MedicosModule } from '../medicos/medicos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    EspecialidadesModule,
    MedicosModule,
  ],
  providers: [UsuariosService, RegisterUsuariosService],
  exports: [UsuariosService, RegisterUsuariosService],
})
export class UsuariosModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamentosService } from './agendamentos.service';
import { Agendamento } from './entities/agendamento.entity';
import { AgendamentosController } from './agendamentos.controller';
import { AuthModule } from '../auth/auth.module';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Grade } from '../grades/entities/grade.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agendamento, Usuario, Grade]),
    AuthModule,
  ],
  providers: [AgendamentosService],
  exports: [AgendamentosService],
  controllers: [AgendamentosController],
})
export class AgendamentosModule {}

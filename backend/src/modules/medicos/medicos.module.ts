import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';
import { MedicosService } from './medicos.service';
import { MedicosControlller } from './medicos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Medico])],
  providers: [MedicosService],
  exports: [MedicosService],
  controllers: [MedicosControlller]
})
export class MedicosModule {}

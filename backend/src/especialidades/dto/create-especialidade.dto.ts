import { BadRequestException } from '@nestjs/common';

export class CreateEspecialidadeDto {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
    this.validate();
  }

  // Função para validar o campo 'nome'
  private validate() {
    if (!this.nome || typeof this.nome !== 'string') {
      throw new BadRequestException(
        'O nome precisa ser uma string e não pode ser vazio.',
      );
    }
  }
}

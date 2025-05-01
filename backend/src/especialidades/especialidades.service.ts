@InjectRepository(Especialidade)
private especialidadeRepository: Repository<Especialidade>;

async create(
  createEspecialidade: CreateEspecialidadeDto,
): Promise<Especialidade> {
  const especialidade = new Especialidade();
  especialidade.nome = createEspecialidade.nome;

  const existente = await this.especialidadeRepository.findOne({ where: { nome: createEspecialidade.nome } });
  if (existente) {
    throw new BadRequestException({ mensagem: 'Especialidade já cadastrada.' });
  }

  return await this.especialidadeRepository.save(especialidade);
}

async findAll(): Promise<Especialidade[]> {
  return await this.especialidadeRepository.find();
}

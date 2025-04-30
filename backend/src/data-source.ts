import { DataSource, DataSourceOptions } from 'typeorm';

export const options: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'Mariana',
  password: 'root',
  database: 'agendamento',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*'],
  synchronize: false,
};

export const dataSource = new DataSource(options);

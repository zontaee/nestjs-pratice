import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'dlsxo123',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{jr,ts}'],
  synchronize: true,
};

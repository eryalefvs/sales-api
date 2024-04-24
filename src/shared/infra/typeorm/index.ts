import { DataSource } from "typeorm"

export const dataSource = new DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "docker",
    "database": "postgres",
    "entities": [
      "src/modules/**/infra/typeorm/entities/*.ts"
    ],
    "migrations": [
      "src/shared/infra/typeorm/migrations/*.ts"
    ],
  })

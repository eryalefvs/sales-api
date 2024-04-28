### Gestão de Vendas API (Backend)

---

Este repositório contém o código-fonte de uma aplicação backend desenvolvida para gestão de vendas. A API oferece funcionalidades robustas para gerenciamento de produtos, clientes, pedidos de compras e usuários da aplicação, integrando boas práticas de desenvolvimento e tecnologias modernas.

### Funcionalidades Principais

- **Cadastro de Produtos:** Permite a criação, listagem, atualização e exclusão de produtos.
- **Cadastro de Clientes:** Permite gerenciar o cadastro de clientes, incluindo operações CRUD.
- **Pedidos de Compras:** Implementa funcionalidades para criar e gerenciar pedidos de compra.
- **Gestão de Usuários:** Sistema completo de autenticação via Token JWT, com controle de acesso, recuperação de senha por email, atualização de perfil e avatar, entre outros recursos.

### Recursos e Tecnologias Utilizadas

- **API Restful:** Implementação de uma API RESTful com Node.js e Express.
- **CORS:** Configuração de Cross-Origin Resource Sharing para segurança e controle de acesso.
- **Tratamento de Erros:** Implementação de middleware para gerenciamento de erros de forma eficiente.
- **Sistema de Roteamento:** Utilização de rotas para mapeamento e controle de endpoints.
- **TypeORM e Padrão Repository:** Uso do TypeORM para integração com o banco de dados Postgres, seguindo o padrão Repository para abstração da camada de persistência.
- **Migrations:** Gerenciamento de versões do banco de dados com migrations.
- **Relacionamento Many-to-Many:** Implementação de relacionamentos complexos entre entidades.
- **Filesystem e Upload de Arquivos:** Funcionalidades para armazenamento e gerenciamento de arquivos.
- **Armazenamento em Amazon S3:** Integração com o serviço de armazenamento da Amazon S3 para uploads de arquivos.
- **Envio de Email:** Utilização do Zoho Mail e Amazon SES para envio de emails (em produção) e email fake (em ambiente de desenvolvimento).
- **Autenticação JWT:** Implementação de autenticação segura com tokens JWT.
- **Cache com Redis:** Utilização do Redis para cache de dados e melhoria de performance.
- **Proteção contra DDoS:** Implementação de medidas de segurança contra ataques de negação de serviço.
- **Design Patterns e DDD:** Aplicação de conceitos de Domain Driven Design (DDD) e Princípios SOLID para estruturação e qualidade do código.
- **Testes Automatizados com Jest:** Desenvolvimento de testes automatizados usando o framework Jest.
- **Deploy na Digital Ocean:** Implementação do deploy em produção na Digital Ocean.

### Tecnologias Principais

- **Node.js:** Ambiente de execução JavaScript server-side.
- **Express:** Framework web para Node.js.
- **Typescript:** Superset tipado de JavaScript.
- **TypeORM:** ORM (Object-Relational Mapping) para Node.js.
- **Postgres:** Banco de dados relacional utilizado com Docker.
- **Redis:** Banco de dados em memória para cache e outras funcionalidades.
- **Amazon S3:** Serviço de armazenamento em nuvem da Amazon.
- **Amazon SES:** Serviço de envio de emails da Amazon.
- **Docker:** Utilizado para facilitar a configuração e ambiente de desenvolvimento.

---

Este projeto segue práticas modernas de desenvolvimento, garantindo eficiência, segurança e escalabilidade na gestão de vendas e operações relacionadas.

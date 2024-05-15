import { container } from "tsyringe"
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository"
import CustomersRepository from "@modules/customers/infra/typeorm/repositories/CustomersRepository"
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository"
import ProductRepository from "@modules/products/infra/typeorm/repositories/ProductRepository"
import { IOrderRepository } from "@modules/orders/domain/repositories/IOrderRepository"
import OrdersRepository from "@modules/orders/infra/typeorm/repositories/OrdersRepository"
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository"
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository"
import { IUserTokensRepository } from "@modules/users/domain/repositories/IUserTokenRepository"
import UserTokenRepository from "@modules/users/infra/typeorm/repositories/UserTokenRepository"
import { IHashProvider } from "@modules/users/providers/HashProvider/models/IHashProvider"
import BcryptHashProvider from "@modules/users/providers/HashProvider/implementations/BCryptHashProvider"

container.registerSingleton<ICustomersRepository>("CustomersRepository", CustomersRepository)
container.registerSingleton<IProductRepository>("ProductsRepository", ProductRepository)
container.registerSingleton<IOrderRepository>("OrdersRepository", OrdersRepository)
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokenRepository);
container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);




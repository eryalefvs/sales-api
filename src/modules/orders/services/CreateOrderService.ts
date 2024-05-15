import AppError from "@shared/errors/AppError";
import { IOrderRepository } from "../domain/repositories/IOrderRepository";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import { IRequestCreateOrder } from "../domain/models/IRequestCreateOrder";
import { IOrder } from "../domain/models/IOrder";

@injectable()
export default class CreateOrderService {
    constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,

    @inject("ProductsRepository")
    private productsRepository: IProductRepository,

    @inject("OrdersRepository")
    private ordersRepository: IOrderRepository
  ) {}

  public async execute({ customer_id, products }: IRequestCreateOrder): Promise<IOrder> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if(!customerExists) {
      throw new AppError("Could not find any customer with the given id.");
    }

    const productExists = await this.productsRepository.findAllByIds(products);

    if(!productExists.length) {
      throw new AppError("Could not find any products with the given ids.");
  }

  const existsProductsIds = productExists.map(product => product.id);

  const checkInexistentProducts = products.filter(
    product => !existsProductsIds.includes(product.id),
  )

      if(checkInexistentProducts.length) {
      throw new AppError(`Could not find any product ${checkInexistentProducts[0].id}`);
  }

  const quantityAvailable = products.filter(
    product => productExists.filter(p => p.id === product.id)[0].quantity <
    product.quantity,
  )

      if(quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`);
  }

  const serializedProducts = products.map(
    product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productExists.filter(p => p.id === product.id)[0].price,
    })
  )

  const order = await this.ordersRepository.createOrder({
    customer_id: customerExists,
    products: serializedProducts,
  })

  const { order_products } = order;

  const updatedProductQuantity = order_products.map(
    product => ({
      id: product.product_id,
      quantity: productExists.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
    })
  )

  await this.productsRepository.updateStock(updatedProductQuantity);

  return order;
}
}

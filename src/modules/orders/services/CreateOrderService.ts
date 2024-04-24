import { CustomersRepository } from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import { OrdersRepository } from "../infra/typeorm/repositories/OrdersRepository";
import Order from "../infra/typeorm/entities/Order";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerExists = await CustomersRepository.findById(customer_id);

    if(!customerExists) {
      throw new AppError("Could not find any customer with the given id.");
    }

    const productExists = await ProductRepository.findAllByIds(products);

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

  const order = await OrdersRepository.createOrder({
    customer: customerExists,
    products: serializedProducts,
  })

  const { order_products } = order;

  const updatedProductQuantity = order_products.map(
    product => ({
      id: product.product_id,
      quantity: productExists.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
    })
  )

  await ProductRepository.save(updatedProductQuantity);

  return order;
}
}

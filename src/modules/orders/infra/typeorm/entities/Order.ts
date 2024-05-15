import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrdersProducts from "./OrdersProducts";
import { IOrder } from "@modules/orders/domain/models/IOrder";
import Customers from "@modules/customers/infra/typeorm/entities/Customers";

@Entity("orders")
class Order implements IOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int")
  order: number;

  @ManyToOne(() => Customers)
  @JoinColumn({ name: "customer_id" })
  customer: Customers;

  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;

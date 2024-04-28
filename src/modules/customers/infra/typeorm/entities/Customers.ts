import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";

@Entity("customers")
export default class Customers implements ICustomer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

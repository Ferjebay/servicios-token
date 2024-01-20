import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cliente } from "./Clientes";
import { FacturaToLicencia } from "./FacturaToLicencia";

@Entity('licencias')
export class Licency {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.licencias)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ type: 'varchar', length: 60 })
  nombre: string;

  @Column({ type: "decimal", precision: 8, scale: 2, default: 0 })
  costo: number;

  @Column({ type: 'int' })
  limit_users: number;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

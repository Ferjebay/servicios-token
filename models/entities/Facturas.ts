import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Cliente } from "./Clientes";
import { FacturaToLicencia } from './FacturaToLicencia';

@Entity('facturas')
export class Factura {

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Cliente, ( cliente ) => cliente.facturas)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ type: 'varchar', length: 50, nullable: true })
  clave_acceso?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  numero_comprobante?: string;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  subtotal: number;
  
  @Column({ type: "decimal", precision: 8, scale: 2 })
  descuento: number;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  iva: number;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  total: number;
  
  @Column({ type: 'varchar', nullable: true })
  estadoSRI?: string;
  
  @Column({ type: 'varchar', nullable: true })
  respuestaSRI?: string;

  @Column({ type: 'bool', default: true })
  isActive?: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

}

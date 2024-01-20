import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Licency } from "./Licencias";
import { Factura } from "./Facturas";

@Entity('clientes')
export class Cliente {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Licency, (licencia) => licencia.cliente)
    licencias: Licency[];

    @OneToMany(() => Factura, ( factura ) => factura.cliente)
    facturas: Factura[];

    @Column({ type: 'varchar', length: 70 })
    nombres: string;

    @Column({ type: 'varchar', length: 70 })
    apellidos: string;

    @Column({ type: 'varchar', length: 70, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 15 })    
    num_telefono: string;

    @Column({ type: 'varchar', length: 13 })
    num_documento: string;

    @Column({ type: 'varchar', length: 100 })
    direccion: string;
   
    @Column({ type: 'bool', default: true })
    isActive: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('FacturaToLicencia')
export class FacturaToLicencia {

    constructor(cantidad: number, costo: number, descuento: number, factura_id: string, licencia_id: string){
      this.cantidad = cantidad;
      this.costo = costo;
      this.licencia_id = licencia_id;
      this.descuento = descuento;
      this.factura_id = factura_id
    }

    @PrimaryGeneratedColumn('uuid')
    public invoice_product_id: number;

    @Column({ type: 'int' })
    public cantidad: number

    @Column({ type: "decimal", precision: 8, scale: 2 })
    public costo: number;

    @Column({ type: "decimal", precision: 8, scale: 2 })
    public descuento: number;

    @Column({ type: 'varchar', length: 40 })
    public factura_id: string;

    @Column({ type: 'varchar', length: 40 })
    public licencia_id: string;

}
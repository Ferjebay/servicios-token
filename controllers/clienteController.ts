import { Response, Request } from 'express';
import { Cliente } from '../models/entities/Clientes';
import { Server } from "../models/server";
import { Factura } from '../models/entities/Facturas';
import { FacturaToLicencia } from '../models/entities/FacturaToLicencia';
import { enviarEmailDetalleFactura } from './emailController';

//Repositorios
const clienteRepo = Server.appDataSource.getRepository(Cliente);
const facturaRepo = Server.appDataSource.getRepository(Factura);

export const agregarCliente = async (req: Request, res: Response) => {

  const { licencias, costo_total, ...rest } = req.body;

  const queryRunner = Server.appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try{    
    // //Crear Cliente
    const cliente = clienteRepo.create( { ...rest } );
    const clientCreated = await queryRunner.manager.save( Cliente, cliente );
    
    // //Crear Factura
    const factura = facturaRepo.create({ 
      cliente: clientCreated.id,
      subtotal: 0.00,
      descuento: 0.00,
      iva: 0.00,
      total: costo_total
    });
    const facturaCreated = await queryRunner.manager.save( Factura, factura );    

    //Crear Tabla Pivot
    const pivot: Array<FacturaToLicencia> = [];    
    licencias.forEach(async (licencia: { id: string, costo: number }) => {
      pivot.push(new FacturaToLicencia(
        1,
        licencia.costo,
        0.00,
        facturaCreated.id,
        licencia.id
      ))
    });
    await queryRunner.manager.save( FacturaToLicencia, pivot );      

    await queryRunner.commitTransaction();
    await queryRunner.release();

    //Enviar correo al cliente
    await enviarEmailDetalleFactura( req.body )

    res.json({ msg: "cliente agregado exitosamente" });

  }catch (error) {
    await queryRunner.commitTransaction();
    await queryRunner.release();

    handleExceptions( error, res )
  }
}

const handleExceptions = ( error: any, res: Response ) => {
  console.log( error );

  if ( error.code ) 
    return res.status(400).json({ msg: error.detail })
    
  return res.status(400).json({ msg: 'Error al consultar en la DB' })
}

import nodemailer from "nodemailer";
import moment from "moment";

export const enviarEmailDetalleFactura = async ( data: any ) => {

  moment.locales
  const fecha = moment().locale("es");
  const fechaGeneracion = fecha.format('LLLL');
  const fechaVencimiento = fecha.add(5, 'days').format('LLLL');

  const config = {
    host: process.env.EMAIL_HOST,
    port: +process.env.EMAIL_PUERTO!,
    secure: +process.env.EMAIL_PUERTO! === 465 ? true : false,
    greetingTimeout: 12000,
    connectionTimeout: 12000,
    dnsTimeout: 12000,
    auth: { user: process.env.EMAIL_USUARIO, pass: process.env.EMAIL_PASSWORD }
  }

  const costoTotal = data.licencias.reduce((acumulador: number, objeto: any) => {
    return acumulador + parseFloat(objeto.costo);
  }, 0);
  
  const htmlContent = ` 
  <div style="width: 50%;margin: auto;">
    <div class="col-6">
      <div class="card">
        <div class="card-title py-1" style="background-color: #ebe8e4;">
          <img src="https://lh3.googleusercontent.com/p/AF1QipPvf_0h1QfnBCQdEzL6Vw3zIOglj0DiMOLYa7i4=s680-w680-h510" 
            style="width: 37%;margin-left: 40px;">
        </div>
        <div class="card-body py-1">
          <h4>Estimado(a): ${ data.nombres } ${ data.apellidos }</h4>

          <label style="font-size: 14px;color: #858484;margin-top: 8px;text-align: justify;">
            Este es un recordatorio de facturación que su factura N° 87586 que fue generada el, ${ fechaGeneracion } 
          </label>

          <label style="font-size: 14px;color: #858484;margin-top: 10px;text-align: justify;display: block;">
            <b>Su forma de pago es:</b> Tarjeta Crédito/Débito
          </label>

          <label style="font-size: 14px;color: #858484;text-align: justify;display: block;margin-top: 10px;">
            <b>Factura #:</b>  87586
          </label>
          <label style="font-size: 14px;color: #858484;text-align: justify;display: block;">
            <b>Total a Pagar:</b> ${ costoTotal } USD
          </label>
          <label style="font-size: 14px;color: #858484;text-align: justify;display: block;">
            <b>Fecha de Vencimiento:</b> ${ fechaVencimiento }
          </label>
          
          <label style="font-size: 14px;color: #858484;text-align: justify;display: block;margin-top: 10px;">
            Puede acceder a su área de cliente para ver y pagar la factura en <a 
              href="https://mikrosystem.net/clientes/viewinvoice.php?id=87586">
              https://mikrosystem.net/clientes/viewinvoice.php?id=87586
            </a> 
          </label>
        </div>
      </div>
    </div>
  </div>  
  `

  let message: any = {
    from: process.env.EMAIL_USUARIO,
    to: data.email,
    subject: 'Factura detalle de compra de licencia',
    html: htmlContent
  }
  
  try {
    const transport = nodemailer.createTransport(config);
    await transport.sendMail(message);
  } catch (error) {
    console.log( error );
  }    

}
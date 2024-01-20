import axios from 'axios';
import { response, Request } from 'express';

const createOrden = async (req: any, res: any) => {
  const { value, cancel_url, brand_name } = req.body;

  const orden = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value
        }
      }
    ],
    payment_source: {
      paypal: {
        experience_context: {
          payment_method_preference: "UNRESTRICTED",
          brand_name,
          landing_page: 'NO_PREFERENCE',
          shipping_preference: "NO_SHIPPING",
          user_action: 'PAY_NOW',
          return_url: `http://${ process.env.HOST }:${ process.env.PORT }/api/paypal/capturar-orden`,
          cancel_url
        }
      }
    }
  }

  try{
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const { data: { access_token } } = await axios.post(`${ process.env.PAYPAL_API }/v1/oauth2/token`, params, {
      auth: {
        username: process.env.PAYPAL_API_CLIENT!,
        password: process.env.PAYPAL_API_SECRET!
      }
    })

    const response: any = await axios.post(`${ process.env.PAYPAL_API }/v2/checkout/orders`, orden, {
      headers: {
        Authorization: `Bearer ${ access_token }`
      }
    })

    res.json( response.data )
  }catch (error) {
      console.log(error);
      return res.json({ msg: 'Error al consultar en la DB' })
  }
}

const capturarOrden = async (req: Request, res = response) => {
  try{
    const { token } = req.query;

    const response = await axios.post(`${ process.env.PAYPAL_API }/v2/checkout/orders/${ token }/capture`, {}, {
      auth: {
        username: process.env.PAYPAL_API_CLIENT!,
        password: process.env.PAYPAL_API_SECRET!
      }
    })

    console.log( response.data );

    res.json( response.data )
  }catch (error) {
      console.log(error);
      return res.json({ msg: 'Error' })
  }
}

const cancelarOrden = async (req: Request, res = response) => {
  try{
    console.log("cancelando orden.....");
    res.json({ ok: true, msg: 'cancelando creada' })
  }catch (error) {
      console.log(error);
      return res.json({ msg: 'Error al consultar en la DB' })
  }
}

module.exports = {
  createOrden,
  capturarOrden,
  cancelarOrden
}
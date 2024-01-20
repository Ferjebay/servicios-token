import express, { Express } from 'express';
import { Licency } from './entities/Licencias';
import { Cliente } from './entities/Clientes';
import { Factura } from './entities/Facturas';
import { FacturaToLicencia } from './entities/FacturaToLicencia';
const cors            = require('cors');
const fileUpload      = require('express-fileupload');
const { DataSource }  = require('typeorm');

export class Server{
    
    private app: Express;
    private port?: string|undefined;
    private paths?: any;
    static appDataSource: any;

    constructor(){
      this.app = express();
      this.port = process.env.PORT;

      this.paths = {
        auth:   '/api/auth',
        paypal: '/api/paypal',
        clientes: '/api/clientes',
      }
      
      //Midlewares
      this.midlewares();

      //Rutas de mi aplicacion
      this.routes();      
    }

    async midlewares(){     
      //Lectura y Parseo del body
      this.app.use( express.json() );
      
      //CORS
      this.app.use( cors() );

      //Directorio publico
      this.app.use(express.static('public'));
      
      //Carga de archivos
      this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        createParentPath: true
      }));

      //DB
      await Server.connectToDatabase();
    }

    static async connectToDatabase(){
      this.appDataSource = new DataSource({
        type: 'postgres',
        host: process.env.HOST,
        username: process.env.USER,
        password: process.env.PASS,
        database: process.env.DATABASE,
        port: 5432,
        autoLoadEntities: true,
        entities: [ Licency, Cliente, Factura, FacturaToLicencia ],
        synchronize: true
      })

      await this.appDataSource.initialize();
    }

    routes(){
      this.app.use(this.paths.auth, require('../routes/auth'));
      this.app.use(this.paths.paypal, require('../routes/paypal'));
      this.app.use(this.paths.clientes, require('../routes/cliente'));
    }

    listen(){        
      this.app.listen(this.port, () => {
          console.log(`Example app listening at http://localhost:${this.port}`)
      })
    }
}
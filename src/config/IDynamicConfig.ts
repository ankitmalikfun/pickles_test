import { ISwaggerDefinition } from '../libs/Swagger';


export default interface IDynamicConfig extends ISwaggerDefinition {
  swaggerUrl: string;
}

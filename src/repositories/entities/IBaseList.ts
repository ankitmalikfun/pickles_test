import IEntity from "./IEntity";

export default interface IBaseList extends IEntity {
  limit?: number;
  skip?: number;
}

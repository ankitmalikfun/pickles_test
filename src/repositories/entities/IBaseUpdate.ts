import IEntity from "./IEntity";

export default interface IBaseUpdate extends IEntity {
  originalId: string;
}

import { Model, Transaction } from "sequelize";
import * as logger from '../../libs/Logger';

export default class BaseRepository<D> {
  private ModelType;
  constructor(model: typeof Model) {
    this.ModelType = model;
  }

  public async create(query: any, t?: Transaction): Promise<D> {
    logger.debug("BaseRepository - create:", JSON.stringify(query));

    const response = t
      ? await this.ModelType.create({ ...query, raw: true }, { transaction: t })
      : await this.ModelType.create({ ...query, raw: true });
    return response.get({ plain: true });
  }

  public async insertMany(query: any, t?: Transaction): Promise<D[]> {
    logger.debug("BaseRepository - insertMany:", JSON.stringify(query));

    const users = t ? await this.ModelType.bulkCreate(query, { transaction: t }) : await this.ModelType.bulkCreate(query);

    return users.map(el => el.get({ plain: true }));
  }

  public async getOne(query: any, t?: Transaction): Promise<D> {
    logger.debug("BaseRepository - getOne:", JSON.stringify(query));

    const response = t
      ? await this.ModelType.findOne({ ...query, raw: true }, { transaction: t })
      : await this.ModelType.findOne({ ...query, raw: true });
    return response;
  }

  public async getAll(query: any): Promise<D[]> {
    logger.debug("BaseRepository - getAll:", JSON.stringify(query));

    const updatedQuery = { raw: true, ...query };
    return await this.ModelType.findAll(updatedQuery);
  }

  public async count(query: any): Promise<number | any> {
    logger.debug("BaseRepository - count:", JSON.stringify(query));

    return await this.ModelType.count({ ...query });
  }
  public async update(update: any, condition: any, t?: Transaction): Promise<D> {
    logger.debug("BaseRepository - update:", JSON.stringify(update), JSON.stringify(condition));

    return t ? await this.ModelType.update(update, condition, { transaction: t }) : await this.ModelType.update(update, condition);
  }

  public async delete(condition: any, t?: Transaction): Promise<D> {
    logger.debug("BaseRepository - delete:", JSON.stringify(condition));

    return t ? await this.ModelType.destroy(condition, { transaction: t }) : await this.ModelType.destroy(condition);
  }

  public async deleteAll(): Promise<number> {
    logger.debug("BaseRepository - deleteAll:");

    const response = await this.ModelType.destroy({ where: {}, force: true });
    return response;
  }
}

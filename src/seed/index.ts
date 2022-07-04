import * as logger from '../libs/Logger';
class Seed {
  private applicationRepository: any;

  public async start() {
    try {
      logger.info("**** NOTHING TO SEED ****");

    } catch (err) {
      logger.error("error in seeding applications", err);
    }
  }
}
export default new Seed();

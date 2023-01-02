import {Document, MongoClient, ObjectId} from 'mongodb'
import config from '@/config'
/**
 *
 */
let cachedClient: MongoClient
/**
 *
 */
export default {
  /**
   *
   */
  async database(db: string) {
    return (await this.client()).db(db)
  },
  /**
   *
   */
  async collection<T extends Document>(name: string, db: string) {
    return (await this.client()).db(db).collection<T>(name)
  },
  /**
   *
   */
  async client() {
    if (!cachedClient)
      cachedClient = await MongoClient.connect(config.mongodbUri)
    return cachedClient
  },
  /**
   *
   */
  async transaction(cb: () => Promise<void>) {
    const client = await this.client()
    const session = client.startSession()
    await session.withTransaction(cb)
    session.endSession()
  },
  /**
   *
   */
  ids: {
    equal(first?: ObjectId, second?: ObjectId) {
      return Boolean(first && second && first.equals(second))
    },
  },
}

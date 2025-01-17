/* eslint-disable @typescript-eslint/no-explicit-any */
import Redis from "ioredis";

class RedisUtils {
  private client: Redis;

  constructor() {
    //  If using docker images then then use the (host:"redis"),
    //  and (port:6379) while creating the instance.
    /**
     * this.client = new Redis({
     *  host: 'redis',
     *  port: 6379,
     * });
     */
    this.client = new Redis({
      host: "localhost",
      port: 6380
    });
    if (this.client) console.log("=> Redis client initialized");
  }

  async setValue(key: string, value: string, ttl?: number) {
    await this.client.set(key, value);
    if (ttl) await this.client.expire(key, ttl);
  }

  async removeValue(key: string): Promise<void> {
    await this.client.del(key);
  }

  async getValue(key: string): Promise<any> {
    return await this.client.get(key);
  }

  async existsValue(key: string) {
    return await this.client.exists(key);
  }

  async getExpirationTime(key: string) {
    return await this.client.ttl(key);
  }

  async storeHash(key: string, value: any, ttl: number = 15 * 60) {
    await this.client.hset(key, value);
    await this.client.expire(key, ttl);
  }

  async getFullHash(key: string) {
    return await this.client.hgetall(key);
  }

  async getPartialHash(key: string, value: string) {
    return await this.client.hget(key, value);
  }

  async deleteHash(key: string) {
    return await this.client.hdel(key);
  }

  async increaseBy(key: string, subKey: string, value: any) {
    return await this.client.hincrby(key, subKey, value);
  }
}

const redis = new RedisUtils();
export default redis;

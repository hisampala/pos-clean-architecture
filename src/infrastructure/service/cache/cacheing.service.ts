import { InjectRedis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class CacheingService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  async get(key: string) {
    const result: any[] = await JSON.parse(await this.redis.get(key));
    if (!result) return [];
    return result;
  }
  async insert(key: string, list: any[]) {
    this.redis.set(key, JSON.stringify(list), "EX", 30);
  }
  async update(key: string, id: string, item: any) {
    const list = await this.get(key);
    if (list.length > 0) {
      const updated = await list.map((value) => {
        if (value.id === id) {
          Object.assign(value, item);
        }
        return value;
      });
      this.redis.set(key, JSON.stringify(updated), "EX", 30);
    } else {
      const initArr = [];
      initArr.push(item);
      this.redis.set(key, JSON.stringify(initArr), "EX", 30);
    }
  }
  async delete(key: string, id: string) {
    const list = await this.get(key);
    if (list.length > 0) {
      const deleted = await list.splice(
        list.findIndex((v) => v.id === id),
        1,
      );
      this.redis.set(key, JSON.stringify(deleted), "EX", 30);
    }
  }
  async getById(key: string, id: string) {
    const list = await this.get(key);
    return list.find((v) => v.id === id);
  }
}

import { Redis } from '@upstash/redis';
import ratelimitPkg from '@upstash/ratelimit';
import dotenv from 'dotenv';

dotenv.config();

const { Ratelimit } = ratelimitPkg;

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(200, '10s'),
});

export default ratelimit;

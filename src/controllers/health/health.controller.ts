import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get()
  async check(): Promise<HealthCheckResult> {
    const health = await this.healthCheckService.check([
      async () => await this.typeOrmHealthIndicator.pingCheck('database'),
    ]);

    return health;
  }
}

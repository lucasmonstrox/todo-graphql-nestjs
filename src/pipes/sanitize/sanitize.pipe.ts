import { Injectable, PipeTransform } from '@nestjs/common';

import { sanitize } from '@hollowverse/class-sanitizer';

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(data /* TODO: Add parameter type */) /* TODO: Add return type */ {
    sanitize(data);

    return data;
  }
}

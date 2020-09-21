import { sanitize } from '@hollowverse/class-sanitizer';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(data: any): any {
    sanitize(data);

    return data;
  }
}

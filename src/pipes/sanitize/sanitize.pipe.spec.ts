import { plainToClass } from 'class-transformer';

import { TodoUpdateInput } from 'inputs/todo-update.input';
import { SanitizePipe } from './sanitize.pipe';

describe('SanitizePipe', () => {
  type SutTypes = {
    sut: SanitizePipe;
  };

  const makeSut = (): SutTypes => {
    const sanitizePipe = new SanitizePipe();
    const sutTypes = { sut: sanitizePipe };

    return sutTypes;
  };

  it('should sanitize input', async () => {
    const { sut } = makeSut();

    const input = plainToClass(TodoUpdateInput, {
      done: true,
      task: ' <script></script> ',
    });

    const transformedInput = sut.transform(input);

    expect(transformedInput).toMatchObject({
      done: true,
      task: '&lt;script&gt;&lt;&#x2F;script&gt;',
    });
  });
});

import { FunctionsHttpError } from '@supabase/supabase-js';
import { extractFunctionsErrorMessage } from './functionsError';

function httpErrorWithBody(body: unknown): FunctionsHttpError {
  const response = { json: () => Promise.resolve(body) } as unknown as Response;
  return new FunctionsHttpError(response);
}

describe('extractFunctionsErrorMessage', () => {
  it('reads the real error message off a FunctionsHttpError response body', async () => {
    const error = httpErrorWithBody({ error: { message: 'Forbidden' } });
    await expect(extractFunctionsErrorMessage(error)).resolves.toBe('Forbidden');
  });

  it('falls back to the generic message when the body has no error.message', async () => {
    const error = httpErrorWithBody({});
    await expect(extractFunctionsErrorMessage(error)).resolves.toBe(
      'Edge Function returned a non-2xx status code'
    );
  });

  it('falls back to the generic message when the body is not readable', async () => {
    const response = { json: () => Promise.reject(new Error('no body')) } as unknown as Response;
    const error = new FunctionsHttpError(response);
    await expect(extractFunctionsErrorMessage(error)).resolves.toBe(
      'Edge Function returned a non-2xx status code'
    );
  });

  it('returns a plain Error message unchanged', async () => {
    await expect(extractFunctionsErrorMessage(new Error('network down'))).resolves.toBe(
      'network down'
    );
  });
});

import { Client } from 'pg';
import { throwError } from './utils/error';
import { ENV } from './constants';

export class DatabaseBuilder {
  private static createClient() {
    return new Client({
      ...ENV().DATABASE,
    }) as Client;
  }

  static async query<T>(
    query: string,
    params?: (string | number | string[] | number[] | boolean)[],
  ): Promise<T[] | null> {
    const client = this.createClient();

    try {
      await client.connect();

      const { rows } = await client.query(query, params);

      await client.end();

      return rows as T[];
    } catch (e) {
      console.error(e);
      console.log(query, params);
      await client.end();
      throwError(e.message, 500);
      return null;
    }
  }
}

export function formatListForInsert(list: any[], nbItemsToInsert: number) {
  if (nbItemsToInsert == 1) {
    return '($1)';
  }

  let lastIndex = 2;

  return list
    .map(
      () =>
        `($1,${Array.from({ length: nbItemsToInsert - 1 })
          .map(() => `$${lastIndex++}`)
          .join(',')})`,
    )
    .join(',');
}

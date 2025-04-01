export declare class DatabaseBuilder {
    private static createClient;
    static query<T>(query: string, params?: (string | number | string[] | number[] | boolean)[]): Promise<T[] | null>;
}
export declare function formatListForInsert(list: any[], nbItemsToInsert: number): string;

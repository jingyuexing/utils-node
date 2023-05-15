export declare function useCookies(cookies?: string): {
   get(key: string): string | undefined;
   set(key: string, value: string): void;
   toString(): string;
};

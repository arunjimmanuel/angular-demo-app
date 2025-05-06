export interface TokenPayload {
    sub?: string;
    email?: string;
    exp?: number;
    iat?: number;
    [key: string]: any;
}
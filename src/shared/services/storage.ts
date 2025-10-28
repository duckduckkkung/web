export class Storage {
    public static getAccessToken(): string | null {
        return localStorage.getItem("tkn") || null;
    }

    public static setAccessToken(value: string) {
        localStorage.setItem("tkn", value);
    }
}

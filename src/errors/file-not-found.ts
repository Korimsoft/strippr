export class FileNotFoundError extends Error {

    public get filePath(): string {
        return this.file;
    }

    constructor(private file: string, message?:string) {
        super(message);
    }
}
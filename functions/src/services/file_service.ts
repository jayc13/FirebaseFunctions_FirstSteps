const jsonfile = require('jsonfile');

class FileService {

    static process(file: File) {
        return new Promise<any>((resolve: Function) => {
            resolve(file.name);
        });
    }

    static processFileAsJson(filePath: string) {
        return new Promise<any>((resolve: Function, reject: Function) => {
            jsonfile.readFile(filePath)
                .then((obj: any) => resolve(obj))
                .catch((e: Error) => reject(e))
        });
    }
}

export default FileService;
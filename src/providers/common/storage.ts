import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { File } from "@ionic-native/file";
import { APP_NAME } from "../../app/constants";
import { LoggerProvider } from "../logger/logger";


@Injectable()
export class StorageProvider {

    constructor(private file: File, private logger: LoggerProvider) {}

    /**
     * Check if the taletime directory on the external root dir exists
     * or create it and ask for the file permission
     */
    public createAppDirOnExtRoot(): Promise<boolean>{
        const promise = new Promise<boolean>((resolve, reject) => {
            let path = this.file.externalRootDirectory;
            let datadir = path + APP_NAME + "/";
            //make sure dir exists
            this.file.checkDir(path, APP_NAME).then(() => {
                this.logger.log(path + "/" + APP_NAME + " exists!");
                this.getPermission(path).then(() => {
                    resolve(true);
                }).catch((error) => reject(error));
            }).catch(
                () => {
                    this.logger.log("<" + datadir + " does not exist!");
                    this.logger.log("Creating directory <" + datadir + ">");
                    this.file.createDir(path, APP_NAME, true).then(() => {
                        this.logger.log("Directory created successfully");
                        this.getPermission(path).then(() => resolve(true)).catch(error => reject(error));
                    }).catch(
                        (err) => {
                            this.logger.error("Directory <" + datadir + "> could not be created");
                            this.logger.error(JSON.stringify(err));
                            reject(err);
                        });

                });
        });
        return promise;
    }

    /**
     * Creates an empty file named 0 to ask for the file permission
     * @TODO: Find a better way to ask for the permission
     * @param path app folder path on the external root dir
     */
    private getPermission(path: string): Promise<boolean>{
        const promise = new Promise<boolean>((resolve, reject) => {
            this.file.createFile(path, '0', true).then(() => {
                resolve(true);
            }).catch(error => {
                reject(new Error("Could not write to app directory!"));
            })
        });
        return promise;
    }

}

import { SupportedProviders } from '../enums';


export class User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    readDataProtection?: boolean;
    provider: SupportedProviders;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        uid: string,
        email: string,
        photoURL: string,
        displayName: string,
        readDataProtection: boolean,
        provider: SupportedProviders,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.uid = uid;
        this.email = email;
        this.photoURL = photoURL;
        this.displayName = displayName || '';
        this.readDataProtection = readDataProtection || false;
        this.provider = provider;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
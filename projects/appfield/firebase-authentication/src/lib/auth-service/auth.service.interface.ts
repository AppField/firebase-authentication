import { auth, User as FirebaseUser } from 'firebase/app';
import { User } from '../models/user';
import { SupportedProviders } from '../enums';


export interface IAuthService {
    setupAuthState(): void;

    userValue(): User;

    // ============ OAuth Methos ============

    googleLogin();

    oAuthLogin(provider: auth.AuthProvider): Promise<boolean>;

    // ============ EMAIL ==================
    emailRegister(email: string, password: string, displayName: string, readDataProtection: boolean): Promise<boolean>

    emailLogin(email: string, password: string): Promise<boolean>

    resetPassword(email: string): Promise<boolean>

    // Sets user data to firestore 
    updateUserData(user: FirebaseUser, provider?: SupportedProviders, displayName?: string, readDataProtection?: boolean);

    // ============= Delete user account and delete user document ===========
    deleteAccount(email: string): Promise<boolean>;

    signOut(): Promise<void>;
}
import { TAuth, TAuthTokenData, TChangePasswordBody, TForgotPasswordEmailBody, TLoginBody, TSignupBody, TUpdateUserBody } from './auth.types';
import { FirebaseService } from '../firebase/firebase.service';
export declare class AuthService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    verifyAuthTokenData({ id, email, password, }: TAuthTokenData): Promise<TAuth | null>;
    updateMe(auth: TAuth, { address, email, firstName, lastName, photo, }: TUpdateUserBody): Promise<TAuth>;
    login({ email, password }: TLoginBody): Promise<string>;
    signup({ email, password, address, firstName, lastName, }: TSignupBody): Promise<string>;
    receivedPasswordForgottenCode(body: TForgotPasswordEmailBody): Promise<void>;
    changeForgottenPassword({ code, email, password, }: TChangePasswordBody): Promise<void>;
    deleteAccount(auth: TAuth, id: string): Promise<boolean>;
}
export declare function formatRowToUser(auth: {
    id: string;
}, userData: any): TAuth;

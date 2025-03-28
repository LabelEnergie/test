import { FirebaseService } from '../firebase/firebase.service';
import { TempCodeType } from 'src/auth/auth.types';
export declare enum TempCodeErrorType {
    timedOut = 1,
    error = 500,
    notFound = 404
}
export declare function testCode(firebaseService: FirebaseService, code: string, type: TempCodeType, email: string): Promise<{
    error: TempCodeErrorType;
    userId?: undefined;
} | {
    userId: any;
    error?: undefined;
}>;

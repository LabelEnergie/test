import { addMinutes } from 'date-fns';
import { FirebaseService } from '../firebase/firebase.service';
import { TempCodeType } from 'src/auth/auth.types';

const LIMITS: { [key: string]: { time: number } } = {
  [TempCodeType.ResetPassword]: {
    time: 10, // minutes validity
  },
};

export enum TempCodeErrorType {
  timedOut = 1,
  error = 500,
  notFound = 404,
}

export async function testCode(
  firebaseService: FirebaseService,
  code: string,
  type: TempCodeType,
  email: string,
) {
  try {
    const tempCodesSnapshot = await firebaseService.firestore
      .collection('tempCodes')
      .where('code', '==', code)
      .where('type', '==', type)
      .where('email', '==', email)
      .get();

    if (tempCodesSnapshot.empty) {
      return { error: TempCodeErrorType.notFound };
    }

    const tempCode = tempCodesSnapshot.docs[0].data();
    const now = new Date();
    const codeDate = tempCode.createdAt.toDate();
    const validUntil = addMinutes(codeDate, LIMITS[type].time);

    if (now > validUntil) {
      return { error: TempCodeErrorType.timedOut };
    }

    return { userId: tempCode.userId };
  } catch (error) {
    console.error('Error testing code:', error);
    return { error: TempCodeErrorType.error };
  }
}

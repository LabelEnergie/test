import { HttpStatus, Injectable } from '@nestjs/common';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  TAuth,
  TAuthTokenData,
  TChangePasswordBody,
  TForgotPasswordEmailBody,
  TLoginBody,
  TSignupBody,
  TUpdateUserBody,
  TempCodeType,
} from './auth.types';
import { hash, createToken } from 'src/utils/crypto';
import { throwError } from 'src/utils/error';
import { FirebaseService } from '../firebase/firebase.service';
import { sendResetPasswordEmail } from 'src/utils/sendEmail';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async verifyAuthTokenData({
    id,
    email,
    password,
  }: TAuthTokenData): Promise<TAuth | null> {
    try {
      const userDoc = await this.firebaseService.firestore
        .collection('users')
        .doc(id)
        .get();

      if (!userDoc.exists) {
        return null;
      }

      const userData = userDoc.data();
      return {
        id: userDoc.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        photo: userData.photo || null,
        address: userData.address,
        isAdmin: userData.isAdmin || false,
      };
    } catch (error) {
      return null;
    }
  }

  async updateMe(
    auth: TAuth,
    {
      address,
      email,
      firstName,
      lastName,
      photo,
    }: TUpdateUserBody,
  ) {
    try {
      await this.firebaseService.firestore
        .collection('users')
        .doc(auth.id)
        .update({
          email,
          firstName,
          lastName,
          address,
          photo,
          updatedAt: new Date(),
        });

      return this.verifyAuthTokenData({ id: auth.id, email, password: '' });
    } catch (error) {
      throwError(
        'Impossible de modifier les informations',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login({ email, password }: TLoginBody) {
    try {
      // First, verify if the user exists in Firebase
      const userRecord = await this.firebaseService.auth
        .getUserByEmail(email.toLowerCase());

      // Get custom token for the user
      const customToken = await this.firebaseService.auth
        .createCustomToken(userRecord.uid);

      // Get user data from Firestore
      const userDoc = await this.firebaseService.firestore
        .collection('users')
        .doc(userRecord.uid)
        .get();

      if (!userDoc.exists) {
        throwError('Email ou mot de passe incorrect', HttpStatus.BAD_REQUEST);
        return null;
      }

      // Create and return JWT token
      return await createToken({
        id: userRecord.uid,
        email: userRecord.email,
        password: customToken // Using customToken instead of password
      });

    } catch (error) {
      console.error('Login error:', error);
      throwError('Email ou mot de passe incorrect', HttpStatus.BAD_REQUEST);
      return null;
    }
  }

  async signup({
    email,
    password,
    address,
    firstName,
    lastName,
  }: TSignupBody) {
    try {
      const userRecord = await this.firebaseService.auth.createUser({
        email: email.trim().toLowerCase(),
        password,
        displayName: `${firstName} ${lastName}`,
      });

      await this.firebaseService.firestore
        .collection('users')
        .doc(userRecord.uid)
        .set({
          email: email.trim().toLowerCase(),
          firstName,
          lastName,
          address,
          createdAt: new Date(),
        });

      return this.login({ email, password });
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        throwError('Cet email est déjà pris', HttpStatus.CONFLICT);
      }
      throw error;
    }
  }

  async receivedPasswordForgottenCode(body: TForgotPasswordEmailBody) {
    try {
      const userRecord = await this.firebaseService.auth.getUserByEmail(body.email);
      if (!userRecord) return;

      const resetLink = await this.firebaseService.auth.generatePasswordResetLink(body.email);
      await sendResetPasswordEmail(body.email, resetLink);
    } catch (error) {
      console.error('Password reset error:', error);
    }
  }

  async changeForgottenPassword({
    code,
    email,
    password,
  }: TChangePasswordBody) {
    try {
      await this.firebaseService.auth.updateUser(email, {
        password: password,
      });
    } catch (error) {
      throwError('La requête est invalide.', HttpStatus.FORBIDDEN);
    }
  }

  async deleteAccount(auth: TAuth, id: string) {
    try {
      await this.firebaseService.auth.deleteUser(id);
      await this.firebaseService.firestore
        .collection('users')
        .doc(id)
        .delete();
      return true;
    } catch (error) {
      throwError('Impossible de supprimer le compte', HttpStatus.INTERNAL_SERVER_ERROR);
      return false;
    }
  }
}

export function formatRowToUser(auth: { id: string }, userData: any): TAuth {
  return {
    id: auth.id,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    photo: userData.photo || null,
    address: userData.address,
    isAdmin: userData.isAdmin || false,
  };
}
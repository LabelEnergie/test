import { Injectable } from '@nestjs/common';
import { TAuth } from 'src/auth/auth.types';
import { TChatMessage, TChatMessageSection, TChatMessageType, TChatNotificationType } from './chat.type';
import { formatDate } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ChatService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async sendMessage(auth: TAuth, receiverId: string, message: string) {
    if (!auth || !auth.id) {
      throw new Error('Utilisateur non authentifié');
    }

    const chatMessage = {
      fromUserId: auth.id,
      toUserId: receiverId,
      message,
      date: new Date(),
      type: TChatMessageType.text
    };

    await this.firebaseService.firestore
      .collection('chats')
      .add(chatMessage);

    return this.getMessages(auth, receiverId);
  }

  async getMessages(auth: TAuth, receiverId: string): Promise<TChatMessageSection[]> {
    const snapshot = await this.firebaseService.firestore
      .collection('chats')
      .where('fromUserId', 'in', [auth.id, receiverId])
      .where('toUserId', 'in', [auth.id, receiverId])
      .orderBy('date')
      .get();

    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      date: doc.data().date.toDate(),
      message: doc.data().message,
      type: doc.data().type,
      isOwner: doc.data().fromUserId === auth.id
    }));

    return this.formatMessagesToSections(messages);
  }

  private formatMessagesToSections(messages: TChatMessage[]): TChatMessageSection[] {
    // Grouper les messages par date
    const groupedMessages: { [key: string]: TChatMessage[] } = messages.reduce((acc, value) => {
      const dateKey = value.date.toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(value);
      return acc;
    }, {} as { [key: string]: TChatMessage[] });

    return Object.entries(groupedMessages).map(([key, value]) => {
      const date = new Date(key);
      return {
        date: {
          label: formatDate(date, 'dd MMMM yyyy', { locale: fr }),
          value: date,
        },
        messages: value as TChatMessage[],
      };
    });
  }
}

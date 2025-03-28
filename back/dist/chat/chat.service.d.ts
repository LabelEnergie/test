import { TAuth } from 'src/auth/auth.types';
import { TChatMessageSection } from './chat.type';
import { FirebaseService } from '../firebase/firebase.service';
export declare class ChatService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    sendMessage(auth: TAuth, receiverId: string, message: string): Promise<TChatMessageSection[]>;
    getMessages(auth: TAuth, receiverId: string): Promise<TChatMessageSection[]>;
    private formatMessagesToSections;
}

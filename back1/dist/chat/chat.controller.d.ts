import { ChatService } from './chat.service';
import { TAuth } from 'src/auth/auth.types';
import { TSendMessageBody } from './chat.type';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getMessages(auth: TAuth, id: string): Promise<import("./chat.type").TChatMessageSection[]>;
    sendMessage(auth: TAuth, id: string, body: TSendMessageBody): Promise<import("./chat.type").TChatMessageSection[]>;
}

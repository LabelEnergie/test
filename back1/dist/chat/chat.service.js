"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const chat_type_1 = require("./chat.type");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const firebase_service_1 = require("../firebase/firebase.service");
let ChatService = class ChatService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async sendMessage(auth, receiverId, message) {
        if (!auth || !auth.id) {
            throw new Error('Utilisateur non authentifié');
        }
        const chatMessage = {
            fromUserId: auth.id,
            toUserId: receiverId,
            message,
            date: new Date(),
            type: chat_type_1.TChatMessageType.text
        };
        await this.firebaseService.firestore
            .collection('chats')
            .add(chatMessage);
        return this.getMessages(auth, receiverId);
    }
    async getMessages(auth, receiverId) {
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
    formatMessagesToSections(messages) {
        const groupedMessages = messages.reduce((acc, value) => {
            const dateKey = value.date.toDateString();
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(value);
            return acc;
        }, {});
        return Object.entries(groupedMessages).map(([key, value]) => {
            const date = new Date(key);
            return {
                date: {
                    label: (0, date_fns_1.formatDate)(date, 'dd MMMM yyyy', { locale: locale_1.fr }),
                    value: date,
                },
                messages: value,
            };
        });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], ChatService);
//# sourceMappingURL=chat.service.js.map
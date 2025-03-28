export type TChatMessageSection = {
    date: {
        label: string;
        value: Date;
    };
    messages: TChatMessage[];
};
export type TChatMessage = {
    id: string;
    message: string;
    type: TChatMessageType;
    isOwner?: boolean;
    date: Date;
};
export declare enum TChatMessageType {
    text = 1
}
export type TSendMessageBody = {
    message: string;
};
export declare enum TChatNotificationType {
    NEW_MESSAGE = 1
}

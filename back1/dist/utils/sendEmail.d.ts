export declare function sendEmail(subject: string, content: string, email: string, options?: {
    link?: string;
    templateId?: string;
}): Promise<void>;
export declare function sendResetPasswordEmail(email: string, code: string): Promise<void>;
export declare function sendErrorEmail(error: any): Promise<void>;

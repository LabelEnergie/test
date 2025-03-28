export declare class WebhookEventLinkDto {
    payment: string;
}
export declare class WebhookEventDetailsDto {
    amount: number;
    currency: string;
}
export declare class WebhookEventDto {
    id: string;
    resource_type: string;
    action: string;
    links: WebhookEventLinkDto;
    details?: WebhookEventDetailsDto;
    created_at: string;
}
export declare class GoCardlessWebhookDto {
    events: WebhookEventDto[];
}

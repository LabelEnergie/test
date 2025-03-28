export interface GoCardlessCustomer {
    email: string;
    given_name?: string;
    family_name?: string;
    metadata?: Record<string, string>;
}

export interface GoCardlessMandate {
    scheme: 'sepa_core' | 'bacs' | 'autogiro';
    links: {
        customer: string;
    };
    metadata?: Record<string, string>;
}

export interface GoCardlessSubscription {
    amount: number;
    currency: string;
    name: string;
    interval_unit: 'monthly' | 'yearly';
    links: {
        mandate: string;
    };
    metadata?: Record<string, string>;
}

export interface GoCardlessWebhookEvent {
    id: string;
    resource_type: string;
    action: string;
    links: {
        subscription?: string;
        payment?: string;
    };
    details?: {
        cause: string;
        description: string;
    };
}
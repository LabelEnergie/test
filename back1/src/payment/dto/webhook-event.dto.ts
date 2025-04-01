import { IsArray, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class WebhookEventLinkDto {
  @IsNotEmpty()
  payment: string;
}

export class WebhookEventDetailsDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  currency: string;
}

export class WebhookEventDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  resource_type: string;

  @IsNotEmpty()
  action: string;

  @IsObject()
  @ValidateNested()
  @Type(() => WebhookEventLinkDto)
  links: WebhookEventLinkDto;

  @IsObject()
  @ValidateNested()
  @Type(() => WebhookEventDetailsDto)
  details?: WebhookEventDetailsDto;

  @IsNotEmpty()
  created_at: string;
}

export class GoCardlessWebhookDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WebhookEventDto)
  events: WebhookEventDto[];
}
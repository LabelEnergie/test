import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Auth, AuthGuard } from 'src/guard';
import { TAuth } from 'src/auth/auth.types';
import { TSendMessageBody } from './chat.type';

@Controller('chat')
@UseGuards(AuthGuard) // Ajout du guard au niveau du controller
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/messages/:id')
  async getMessages(@Auth() auth: TAuth, @Param('id') id: string) {
    return await this.chatService.getMessages(auth, id);
  }

  @Post('/messages/:id')
  async sendMessage(
    @Auth() auth: TAuth,
    @Param('id') id: string,
    @Body() body: TSendMessageBody,
  ) {
    return await this.chatService.sendMessage(auth, id, body.message);
  }
}

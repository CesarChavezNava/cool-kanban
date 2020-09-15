import { Response } from 'express';
import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { Card } from '../core/entities/card.entity';
import { CardService } from './card.service';
import { CreateCardDto, UpdateCardDto } from './dtos';

@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post()
  async create(
    @Body() dto: CreateCardDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const card: Card = await this.cardService.create(dto);
      res.status(HttpStatus.CREATED).send(card);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCardDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const card: Card = await this.cardService.update(id, dto);
      res.status(HttpStatus.OK).send(card);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Delete(':idList/:id')
  async delete(
    @Param('idList') idList: string,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.cardService.delete(idList, id);
      res.status(HttpStatus.OK).send(true);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}

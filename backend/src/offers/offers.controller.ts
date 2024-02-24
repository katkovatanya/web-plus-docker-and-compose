import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestOwnUser } from 'src/users/users.controller';
import { Offer } from './entities/offer.entity';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createOffer(
    @Request() req: RequestOwnUser,
    @Body() createOfferDto: CreateOfferDto,
  ): Promise<Record<string, never>> {
    await this.offersService.createOffer(req.user, createOfferDto);
    return {};
  }

  @UseGuards(JwtGuard)
  @Get()
  async getOffers(): Promise<Offer[]> {
    return await this.offersService.getOffers();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getOfferById(@Param('id') id: string): Promise<Offer> {
    return await this.offersService.getOfferById(+id);
  }
}

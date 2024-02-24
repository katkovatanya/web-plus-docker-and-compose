import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CreateOfferDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @IsNumber()
  itemId: number;
}

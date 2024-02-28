import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { IsString, Length, IsUrl, Min } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column()
  @Length(1, 250)
  @IsString()
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Min(1)
  price: number;

  
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  raised: number;

  @Column({ type: 'int', default: 0 })
  copied: number;

  @Column()
  @IsString()
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.wishes, {
    onDelete: 'CASCADE',
  })
  wishlists: Wishlist[];
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/common';

@Entity({ name: 'media' })
export class Upload extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  path: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  ownerUuid: string;
}

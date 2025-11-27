import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from 'src/common';
import { v4 as uuidv4 } from 'uuid';
import { Account } from 'src/modules/accounts/entities/account.entity';
import { AccountRatetingProjectEntity } from './account-rating-project.entity';
@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'uuid', length: 36, unique: true })
  uuid: string;
  @Column({ type: 'varchar', length: 100 })
  name: string;
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  is_enable: boolean;
  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }
  @Column({ type: 'varchar', length: 255, nullable: true })
  url: string;
  @JoinColumn({ name: 'created_by', referencedColumnName: 'uuid' })
  @OneToMany(() => Account, (accounts) => accounts.uuid, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  accounts: Account[];
  @OneToMany(() => AccountRatetingProjectEntity, (arp) => arp.project_uuid)
  accountRatetingProjects: AccountRatetingProjectEntity[];
}

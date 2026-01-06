import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from 'src/common';
import { v4 as uuidv4 } from 'uuid';
import { Account } from 'src/modules/accounts/entities/account.entity';
import { AccountRatetingProjectEntity } from './account-rating-project.entity';
import { ProjectDetail } from 'src/modules/project-detail/entities/project-detail.entity';

@Index('uq_project_slug', ['slug'], { unique: true })
@Index('idx_project_enable', ['is_enable'])
@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  is_enable: boolean;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  @JoinColumn({ name: 'created_by', referencedColumnName: 'uuid' })
  @ManyToOne(() => Account, (accounts) => accounts.uuid, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  accounts: Account[];

  @OneToMany(() => AccountRatetingProjectEntity, (arp) => arp.project_uuid)
  accountRatetingProjects: AccountRatetingProjectEntity[];

  @OneToMany(() => ProjectDetail, (projectDetail) => projectDetail.project)
  details: ProjectDetail[];
}

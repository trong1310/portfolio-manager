import { Type } from 'class-transformer';
import { BaseEntity } from 'src/common';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from 'src/modules/accounts/entities/account.entity';
import { Project } from './project.entity';

@Entity({ name: 'account_rateting_projects' })
export class AccountRatetingProjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    rate: number;

    @Column({ type: 'text', nullable: true })
    description: string;
    @Column({type: 'boolean', default: true , nullable: false })
    is_enable: boolean;
    // khóa ngoại tới Account
    @ManyToOne(() => Account, (account) => account.accountRatetingProjects, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account_uuid: string;
    // khóa ngoại tới Project
    @ManyToOne(() => Project, (project) => project.accountRatetingProjects, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'project_id' })
    project_uuid: string;
}

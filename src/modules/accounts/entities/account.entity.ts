import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from 'src/common';
import { v4 as uuidv4 } from 'uuid';
import { AccountRatetingProjectEntity } from 'src/modules/projects/entities/account-rating-project.entity';
@Entity({ name: 'accounts' })
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'uuid', length: 36,unique: true })
  uuid: string;
  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'nvarchar', length: 1024 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'full_name' })
  fullName: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }
    @OneToMany(() => AccountRatetingProjectEntity, (arp) => arp.account_uuid)
    accountRatetingProjects: AccountRatetingProjectEntity[];
}

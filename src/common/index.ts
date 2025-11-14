import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  
  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;

  @Column({name: 'is_enable', type: 'boolean', default: true})
  isEnable: boolean;
}

export interface JwtData {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
  fullname: string;
}

import { BaseEntity } from 'src/common';
import { Project } from 'src/modules/projects/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class ProjectDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true ,length:36})
  uuid: string;
  @Column({ nullable: false })
  title: string;
  @Column({ nullable: false })
  description: string;
  @Column({nullable: false })
  isMain: boolean;
  @Column({ nullable: false ,default: true})
  is_enable: boolean;
  @Column({ nullable: false })
  project_uuid: string;
  @ManyToOne(() => Project, project => project.details, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'project_uuid' })
  project: Project;
  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }
  
}




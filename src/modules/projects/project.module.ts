import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { Upload } from "../upload/entities/upload.entity";
import { AccountRatetingProjectEntity } from "./entities/account-rating-project.entity";
import { ProjectDetail } from "../project-detail/entities/project-detail.entity";
@Module({
    imports: [TypeOrmModule.forFeature([Project,Upload,AccountRatetingProjectEntity,ProjectDetail])],
    controllers: [ProjectController],
    providers: [ProjectService],
    exports: [ProjectService],

})
export class ProjectModule {}
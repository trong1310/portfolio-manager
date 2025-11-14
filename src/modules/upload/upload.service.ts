import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { File as MulterFile } from 'multer';
import { Repository } from 'typeorm';
import { Upload } from './entities/upload.entity';

@Injectable()
export class UploadService {
    private logger = new Logger(UploadService.name);
    constructor(
      @InjectRepository(Upload)
      private readonly uploadRepository: Repository<Upload>,
    ) {}
 async handleSingleFile(file: MulterFile, ownerUuid?: string) {

  const newFile = this.uploadRepository.create({
    ownerUuid,
    path: `/uploads/${file.filename}`,
  });

  await this.uploadRepository.save(newFile);

  return {
    originalname: file.originalname,
    filename: file.filename,
    size: file.size,
    mimetype: file.mimetype,
    url: `/uploads/${file.filename}`,
  };
}


  handleMultiFiles(files: MulterFile[] , ownerUuid?: string) {
    const multiFiles = this.uploadRepository.create(files.map((file) => ({
      ownerUuid: ownerUuid,
      path: `/uploads/${file.filename}`,
    })));
    this.uploadRepository.save(multiFiles);
    return files.map((file) => ({
      originalname: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      url: `/uploads/${file.filename}`,
    }));
  }
}

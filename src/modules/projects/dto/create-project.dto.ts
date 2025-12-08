import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class CreateProjectDto {
  @ApiProperty({ title: "Tên dự án", example: "Dự án A" })
  @IsString({ message: "Tên dự án phải là chuỗi" })
  @IsNotEmpty({ message: "Tên dự án không được để trống" })
  name: string;
  @ApiProperty({ title: "Mô tả dự án", example: "Đây là mô tả của dự án A", required: false })
  @IsString({ message: "Mô tả dự án phải là chuỗi" })
  description: string;
  @ApiProperty({title:"Images Url of project", required: false})
  @IsString({ each: true, message: "Images Url phải là chuỗi" })
  imageUrls: string[];
  @ApiProperty({ title: "URL dự án", example: "http://example.com", required: false })
  @IsString({ message: "URL dự án phải là chuỗi" })
  url: string;
  @ApiProperty({title: "Access Key", example: "key", required: true})
  @IsString({ message: "Access Key phải là chuỗi" })
  accessKey: string;
}
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
  @ApiProperty({title:"Images Url of project", example: "http://example.com/image.png", required: false})
  @IsString({ message: "Images Url phải là chuỗi" })
  imagesUrl: string;
}
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ParseObjectIdPipe } from "./pipes/parseObjectId.pipe";
import { Document, Types } from "mongoose";
import { BaseService } from "./baseService.service";

@Controller()
export class BaseController<T extends Document, K> {
  constructor(private readonly service: BaseService<T, K>) {
  }

  @Post()
  async create(@Body() createDto: Partial<T>) {
    const data = await this.service.create(createDto);
    return { data };
  }

  @Get()
  async findAll() {
    const data = await this.service.findAll();
    return { data };
  }

  @Get(":id")
  async findOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    const data = await this.service.findById(id);
    return { data };
  }

  @Put(":id")
  async update(@Param("id", ParseObjectIdPipe) id: Types.ObjectId, @Body() updateDto: Partial<T>) {
    const data = await this.service.update(id, updateDto);
    return { data };
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    await this.service.delete(id);
  }
}
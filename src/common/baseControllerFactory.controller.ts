import { Body, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Type, UsePipes } from "@nestjs/common";
import { BaseService } from "./baseService.service";
import { ParseObjectIdPipe } from "./pipes/parseObjectId.pipe";
import { Document, Types } from "mongoose";
import { CustomValidationPipe } from "./pipes/customValidation.pipe";

// export function BaseControllerFactory<T extends Document, DTO, C extends Partial<T>, U extends Partial<T>, Q>(
//   createDto: Type<C>,
//   updateDto: Type<U>,
//   queryDto: Type<Q>
// ) {
//   const createPipe = new CustomValidationPipe({ whitelist: true, transform: true }, { body: createDto });
//   const updatePipe = new CustomValidationPipe({ whitelist: true, transform: true }, { body: updateDto });
//   const queryPipe = new CustomValidationPipe({ whitelist: true, transform: true }, { query: queryDto });
//
//   class BaseController<T extends Document, DTO, C extends Partial<T>, U extends Partial<T>, Q> {
//     public readonly service: BaseService<T, DTO>;
//
//     @Post()
//     @UsePipes(createPipe)
//     async create(@Body() body: C): Promise<DTO> {
//       return await this.service.create(body);
//     }
//
//     @Get(":id")
//     async getOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId): Promise<DTO> {
//       return await this.service.findById(id);
//     }
//
//     // @Get()
//     // @UsePipes(queryPipe)
//     // get(@Query() query: Q): Promise<DTO[]> {
//     //   return this.service.getItems(query);
//     // }
//
//     @Delete(":id")
//     @HttpCode(HttpStatus.NO_CONTENT)
//     async remove(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
//       await this.service.delete(id);
//     }
//
//     @Put(":id")
//     @UsePipes(updatePipe)
//     async update(@Param("id", ParseObjectIdPipe) id: Types.ObjectId, @Body() body: U): Promise<DTO> {
//       return await this.service.update(id, body);
//     }
//   }
//
//   return BaseController;
// }
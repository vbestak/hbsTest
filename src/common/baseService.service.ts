import { Document, Model, Types } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseService<T extends Document, K> {
  constructor(private readonly model: Model<T>, protected transformToClass: (data: Partial<T>) => K) {
  }

  async findAll(): Promise<K[]> {
    const res = await this.model.find().exec();
    return res.map(item => this.transformToClass(item.toObject()));
  }

  async findById(id: Types.ObjectId): Promise<K | null> {
    const res = await this.model.findById(id).exec();
    if (!res) return null;
    return this.transformToClass(res.toObject());
  }

  async create(data: Partial<T>): Promise<K> {
    const createdModel = new this.model(data);
    const res = await createdModel.save() as T;
    return this.transformToClass(res.toObject());
  }

  async update(id: Types.ObjectId, updateData: Partial<T>): Promise<K | null> {
    const res = await this.model.findByIdAndUpdate(id, updateData, { new: true }).exec();
    return this.transformToClass(res.toObject());
  }

  async delete(id: Types.ObjectId): Promise<null> {
    await this.model.findByIdAndDelete(id).exec();
    return null;
  }
}
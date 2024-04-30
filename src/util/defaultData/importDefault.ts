import { FilterQuery, Model } from "mongoose";
import * as fs from "fs";
import { Logger } from "@nestjs/common";

export interface IImportDefaultDataProps<T> {
  filePath: string,
  keyField: keyof T,
  model: Model<T>,
  modelName: string
  dataModifier?: (item: T) => Promise<T>,
}

export async function importDefaultData<T>(props: IImportDefaultDataProps<T>) {
  const {
    filePath,
    keyField,
    model,
    dataModifier,
    modelName
  } = props;

  try {
    const rawData = fs.readFileSync(filePath, "utf-8");

    let items: T[] = JSON.parse(rawData);

    if(dataModifier) {
      items = await Promise.all(items.map(dataModifier));
    }

    const filter: FilterQuery<any> = { [keyField]: { $in: items.map(item => item[keyField]) } };
    const existingItems: T[] = await model.find(filter).lean();

    const newItems = items.filter(item => !existingItems.some(existingItem => existingItem[keyField] === item[keyField]));

    if (newItems.length > 0) {
      await model.insertMany(newItems);
      Logger.log(`[${modelName}]: default data imported successfully.`);
    } else {
      Logger.log(`[${modelName}]: no new data to import.`);
    }
  } catch (err) {
    Logger.error(`[${modelName}]: error importing data:`, err);
  }
}


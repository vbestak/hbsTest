import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {UserDocument, User} from '../domain/entity/user.entity';
import * as bcrypt from 'bcrypt';
import {ConfigService} from '@nestjs/config';
import {CreateUserDto} from "../domain/dto/createUser.dto";
import {PageableDto} from "../../common/dto/pageable.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private configService: ConfigService) {}

    async getPage(page: number, size: number, searchTerm: string): Promise<PageableDto<User>> {
        const users = await this.userModel
            .find({
                username: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })
            .sort({username: 1})
            .skip(size * page)
            .limit(size)
            .lean()
            .exec();

        return new PageableDto<User>({
            content: users.map(user => new User(user)),
            pageSize: size,
            pageNumber: page,
        });
    }

    async findById(id: Types.ObjectId | string): Promise<User | undefined> {
        const user = await this.userModel.findById(id).lean().exec();

        if (user) {
            return new User(user);
        }
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.userModel
            .findOne({
                email,
            }).lean().exec()

        if (user) {
            return new User(user);
        }
    }

    async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.userModel
            .findOne({
                username,
            }).lean().exec()

        if (user) {
            return new User(user);
        }
    }

    async deleteUser(id: string): Promise<void> {
        await this.userModel.deleteOne({_id: id}).exec();
    }

    async createUser(createUserDTO: CreateUserDto): Promise<void> {
        const password = await this.hashPassword(createUserDTO.password);
        const user = new this.userModel({username: createUserDTO.username, email: createUserDTO.email, password});
        await user.save();
    }

    async hashPassword(password): Promise<string> {
        const saltRounds = this.configService.get('SALT_ROUNDS');
        const salt = await bcrypt.genSalt(Number(saltRounds));
        return await bcrypt.hash(password, salt);
    }
}

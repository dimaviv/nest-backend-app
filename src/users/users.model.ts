import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Post} from "../posts/posts.model";

interface UserCreationAttrs{
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{

    @ApiProperty({example:'1', description: 'Unique ID'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;

    @ApiProperty({example:'user@gmail.com', description:'Email address'})
    @Column({type: DataType.STRING, unique:true, allowNull:false})
    email:string;

    @ApiProperty({example:'123456', description:'User\'s password'})
    @Column({type: DataType.STRING, allowNull:false})
    password:string;

    @ApiProperty({example:'true', description:'Whether user is banned'})
    @Column({type: DataType.BOOLEAN, defaultValue:false})
    banned: boolean;

    @ApiProperty({example:'For spamming', description:'Ban reason'})
    @Column({type: DataType.STRING, allowNull:true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[];
}
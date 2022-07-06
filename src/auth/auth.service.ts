import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-users.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "../roles/roles.model";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }


    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate){
            throw new HttpException('User with this name already exists', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password:hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User){
         const payload = {id:user.id, email:user.email, roles: user.roles}
         return {
             token: this.jwtService.sign(payload)
         }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({message:'Incorrect email or password'})
    }
}
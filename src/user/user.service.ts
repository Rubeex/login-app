import { ConflictException, HttpCode, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ActiveUserInterface } from 'src/Common/interfaces/ActiveUserInterface';
import { Roles } from 'src/Common/interfaces/Roles';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository : Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const  {username,email} = createUserDto;

    try {
      await this.findEmailName(username,email);
      await this.userRepository.save(createUserDto);
      return {
        message : "User Create successfully"
      }
    } catch (error) {
      if(error instanceof ConflictException){
        throw error
      }else{
        throw new InternalServerErrorException("An error occurred while creating the user.");
      }
    }
  }

  async findEmailName (username:string , email:string){
   const user = await this.userRepository.findOne({
    where:[{username: username},
      {email:email}
    ]
   })
   if(user){
      throw new ConflictException("Username / Email already use"); 
   }
  }

  async findEmail(email:string){
    const user = await this.userRepository.findOne({
     where:{
       email:email
     }    
    })
    if(!user){
       throw new NotFoundException("Email Not Found in database"); 
    }
    return user;
   }
 


  async findAll(user:ActiveUserInterface) {
    if(user.rol === Roles.admin){
      return await this.userRepository.find({select:['id','username','email']});
    }
     throw new UnauthorizedException('Access denied');
  }

  async getProfile(user:ActiveUserInterface) {
    if(user.rol === Roles.admin){
       const admin = await this.userRepository.findOne({
        where: {id: user.id},
        select: ['username','email']
       });

       return {
        message: `Welcome ${admin.username} email : ${admin.email}`
       }
       
    }
    const users = await this.userRepository.findOne({
      where: {id: user.id},
      select: ['username','email']
     });
     
     return {
      message: `Welcome ${users.username} email : ${users.email}`
     }
    
  }


  async findOne(id: number, user:ActiveUserInterface) {
      if(user.rol === Roles.admin){
        const targetUser  = await this.userRepository.findOne({
          where: {id: id},
          select: ['username','email' , 'birthdate' , 'name']
         })
         if(!targetUser ){
           throw new NotFoundException('User not found');
         }
        return targetUser ;
      }
      const currentUser  = await this.userRepository.findOne({
        where: {id: user.id},
        select: ['username','email' , 'birthdate' , 'name']
       })
       if(!currentUser ){
         throw new UnauthorizedException('No permission to access this resource');
       }
      return currentUser ;
  }

}

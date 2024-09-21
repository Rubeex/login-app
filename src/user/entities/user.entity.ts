import { Roles } from "src/Common/interfaces/Roles";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class User {

    @PrimaryGeneratedColumn({type: 'int'})
    id: Number;
    @Column()
    name:string;
    @Column({ unique: true })
    username:string;
    @Column({ unique: true })
    email:string;
    @Column()
    password:string;
    @Column({type:'date'})
    birthdate:Date;
    @Column({type:'enum' , enum:Roles , default: Roles.user})
    rol:Roles
    @CreateDateColumn()
    create_at:Date;
    @UpdateDateColumn()
    update_at:Date
    
}

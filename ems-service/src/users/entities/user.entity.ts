import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { UserRole } from "../../shared/enums/user-role.enum";

@Entity()
@Unique(["Username"])
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ unique: true, nullable: false })
  Username: string;

  @Column()
  Password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.User,
  })
  Role: UserRole;
}

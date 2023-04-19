import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document{

    @Prop({
        index: true,
    })
    business_name: string;
    
    @Prop({
        unique: true,
        index: true,
    })
    email: string;

    @Prop({
        index: true,
    })
    password: string;

    @Prop({
        index: true,
        default: false
    })
    verifyEmail: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
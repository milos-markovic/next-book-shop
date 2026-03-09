'use server'

import connectDb from "@/db/connectDB";
import { comparePassword, cryptPassword } from "@/lib/password";
import { createSession, deleteSession } from "@/lib/session";
import { formActionState, loginSchema, registerSchema } from "@/lib/validate";
import { User } from "@/models/User";
import { redirect } from "next/navigation";


export const register = async (initialState: formActionState, formData: FormData): Promise<formActionState> => {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    const parsedData = registerSchema.safeParse({
        name,
        email,
        password,
        confirmPassword
    });

    if(!parsedData.success){
        console.log(parsedData.error)
        return {
            success: false,
            errors: parsedData.error.flatten().fieldErrors,
        }
    }

    const hashedPassword = await cryptPassword(parsedData.data.password);

    await connectDb();

    await User.create({
        name: parsedData.data.name,
        email: parsedData.data.email,
        password: hashedPassword
    })

    return {success: true}
}

export const login = async (initialState: formActionState, formData: FormData): Promise<formActionState> => {
    const email = formData.get('email')
    const password = formData.get('password')

    const parsedData = loginSchema.safeParse({
        email,
        password,
    })

    if(!parsedData.success){
        return {
            success: false,
            errors: parsedData.error.flatten().fieldErrors,
        }
    }

    await connectDb();

    const findUser = await User.findOne({email: email});

    if(findUser){
        const isTruePassword = await comparePassword(parsedData.data.password, findUser.password);

        if(isTruePassword){
          await createSession(findUser._id.toString())
           return {success: true}
        }
    }

    return {success: false}
}

export async function logout() {
  await connectDb();

  await deleteSession();
  redirect("/login");
}


 
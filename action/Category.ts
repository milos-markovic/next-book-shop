'use server';

import connectDb from "@/db/connectDB";
import { createCategorySchema, formActionState, updateCategorySchema } from "@/lib/validate";
import { Category } from "@/models/Category";
import { revalidatePath } from "next/cache";

export const addCategory = async (initialState: formActionState, formData: FormData) => {
    const name = formData.get("name") as string;

    const parsedData = createCategorySchema.safeParse({
        name,
    });

    if(!parsedData.success){
        return {
            success: false,
            errors: parsedData.error.flatten().fieldErrors,
        }
    }

    await connectDb();
    
    await Category.create({
        name: parsedData.data.name,
    });

    return {success: true}
}

export const updateCategory = async (initialState: formActionState, formData: FormData): Promise<formActionState> => {
    const categoryId = formData.get("categoryId") as string;
    const name = formData.get("name") as string;
    
    const parsedData = updateCategorySchema.safeParse({
        name,
    });

    if(!parsedData.success){
        return {
            success: false,
            errors: parsedData.error.flatten().fieldErrors,
        }
    }

    await connectDb();
    
    await Category.findByIdAndUpdate(categoryId, {
        name: parsedData.data.name,
    });

    revalidatePath(`/admin/categories/edit/${categoryId}`);

    return {success: true}
}

export const getCategory = async (id: string) => {
    return await Category.findById(id).lean();
}

export const getCategories = async ({page = 1, limit = 10}: {page?: number, limit?: number}) => {
    const skip = (page - 1) * limit;

    await connectDb();

    const totalCategories = await Category.countDocuments();
    const totalPages = Math.ceil(totalCategories / limit)

    const categories = await Category.find({})
                    .skip(skip)
                    .limit(limit)
                    .sort({ _id: -1 })
                    .lean();

    return {
        categories,
        totalPages
    }
}

export const deleteCategory = async (id: string) => {
    await connectDb();   

    const findCategory = await Category.findById(id);
    if (!findCategory) {
        return { success: false };
    }

    await Category.findByIdAndDelete(id);
    revalidatePath('/admin/categories');

    return { success: true };
}
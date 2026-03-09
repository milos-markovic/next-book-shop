"use server"

import connectDb from "@/db/connectDB";
import { createFlterSchema, formActionState, updateFilterSchema } from "@/lib/validate";
import { Filter } from "@/models/Filter";
import { revalidatePath } from "next/cache";

export const insertFilter = async (initialState: formActionState, formData: FormData) => {
    const name = formData.get("name") as string;

    const parsedData = createFlterSchema.safeParse({
        name,
    });

    if(!parsedData.success){
        return {
            success: false,
            errors: parsedData.error.flatten().fieldErrors,
        }
    }

    await connectDb();
    
    await Filter.create({
        name: parsedData.data.name,
    });

    return {success: true}
}

export const updateFilter = async (initialState: formActionState, formData: FormData): Promise<formActionState> => {
    const filterId = formData.get("filterId") as string;
    const name = formData.get("name") as string;
    
    const parsedData = updateFilterSchema.safeParse({
        name,
    });

    if(!parsedData.success){
        return {
            success: false,
            errors: parsedData.error.flatten().fieldErrors,
        }
    }

    await connectDb();
    
    await Filter.findByIdAndUpdate(filterId, {
        name: parsedData.data.name,
    });

    revalidatePath(`/admin/filters`);

    return {success: true}
}

export const deleteFilter = async (filterId: string) => {
    await connectDb();   

    const findFilter = await Filter.findById(filterId);
    if (!findFilter) {
        return { success: false };
    }

    await Filter.findByIdAndDelete(filterId);
    revalidatePath('/admin/categories');

    return { success: true };
}

export const getFilter = async (filterId: string) => {
    const filterDoc = await Filter.findById(filterId);

    return filterDoc;
}

export const getFilters = async () => {
    await connectDb();

    const filtersDoc = await Filter.find({},'_id name').sort({createdAt: -1}).lean();
    const filters = filtersDoc.map(filter => {
        return {...filter, _id: filter._id.toString()}
    })

    return filters;
}
'use server'

import { Book } from "@/models/Book";
import { Category } from "@/models/Category";
import { Filter } from "@/models/Filter";
import { Order } from "@/models/Order";
import { User } from "@/models/User";

export const countDocuments = async () => {
    const countBooks = await Book.countDocuments();
    const countCategories = await Category.countDocuments();
    const countFilters = await Filter.countDocuments();
    const countOrders = await Order.countDocuments();
    const countUsers = await User.countDocuments();

    return {
        countBooks,
        countCategories,
        countFilters,
        countOrders,
        countUsers
    };
};
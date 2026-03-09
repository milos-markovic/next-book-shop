'use server'

import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";
import connectDb from "@/db/connectDB";
import { createBookSchema, formActionState, updateBookSchema } from "@/lib/validate";
import { Book, BookType } from "@/models/Book";
import { revalidatePath } from "next/cache";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

type Pagination = {
  page?: number, 
  limit?: number
}


export const getBooks = async ({page = 1, limit = 10}: Pagination, filters: object = {}) => {
  await connectDb();
  
  const skip = (page - 1) * limit;

  const booksDoc = await Book.find(filters)
                    .populate("category", '-_id name')
                    .skip(skip)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .lean();
  
  const totalBooks = (await Book.find(filters).lean()).length
  const totalPages = Math.ceil(totalBooks / limit)

  const books = booksDoc.map(book => {
    return {...book, _id: book._id.toString(), filter: book.filter?.toString()}
  })

  return {
    books,
    totalPages
  }
}

export const getBook = async (id: string) => {
    await connectDb();  

    const bookDoc = await Book.findById(id).populate("category").lean();

    const book = {...bookDoc, _id: bookDoc?._id.toString(), category: {...bookDoc?.category, _id: bookDoc?.category?._id.toString()}, filter: bookDoc?.filter?.toString()};

    return book;
}

const uploadFile = async (file: File) => {
  if (!file) {
    return;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "img/books");

  const filename = `${file.name}`;
  const filepath = path.join(uploadDir, filename);

  await writeFile(filepath, buffer);

  return `/img/books/${filename}`;
};

const deleteImage = async (imgPath: string) => {
  try {
    const fullPath = path.join(process.cwd(), "public", imgPath);

    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
      console.log("Image deleted:", fullPath);
    } else {
      console.log("Image not found:", fullPath);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

export const createBook = async (initialState: formActionState, formData: FormData) => {
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File;
    const publisher = formData.get('publisher') as string;
    const pages = formData.get('pages') as string;
    const format = formData.get('format') as string;
    const year = formData.get('year') as string;
    const binding = formData.get('binding') as string
    const letter = formData.get('letter') as string
    const filter = formData.get('filter')
    
    const bookParsed = createBookSchema.safeParse({
        title,
        author,         
        description,
        price,
        category,
        img: imageFile,
        publisher,
        pages,
        format,
        year,
        letter,
        binding,
        filter: filter ? filter : undefined
    });

    if (!bookParsed.success) {
        console.log("Validation errors:", bookParsed.error.flatten().fieldErrors);
        return {
            success: false,
            errors: bookParsed.error.flatten().fieldErrors
        };
    }

    await connectDb();    
    
    const uploadImage = await uploadFile(imageFile);

    const data = {...bookParsed.data, img: uploadImage, filter };

    await Book.create(data);
   
    return { success: true };   
}    

export const updateBook = async (initialState: formActionState, formData: FormData) => {
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;      
    const author = formData.get('author') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);      
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File;
    const publisher = formData.get('publisher') as string;
    const pages = formData.get('pages') as string;
    const format = formData.get('format') as string;
    const year = formData.get('year') as string;
    const binding = formData.get('binding') as string
    const letter = formData.get('letter') as string   
    const inPreparation = formData.get('inPreparation');
    const filter = formData.get('filter')   
    
    const bookExists = await Book.findById(id);
    if (!bookExists) {
        return {     
        success: false,
        errors: { general: ["Book not found."] }
      };
    }

    const bookParsed = updateBookSchema.safeParse({
        author,         
        description,        
        price,
        category,
        img: imageFile ? imageFile : undefined,                                            
        publisher,
        pages,
        format,
        title,
        year,
        letter,
        binding,
        inPreparation: inPreparation ? true : false,
        filter: filter ? filter : undefined
    });      
    
    if (!bookParsed.success) {
        console.log("Validation errors:", bookParsed.error.flatten().fieldErrors);
        return {
            success: false,
            errors: bookParsed.error.flatten().fieldErrors
        };
    }

    await connectDb();    
    
    let uploadImage;
    if (imageFile && imageFile.size > 0) {
        await deleteImage(bookExists.img);
        uploadImage = await uploadFile(imageFile);
    }       

    
    
    const data = {
      ...bookParsed.data, 
      img: uploadImage ? uploadImage : bookExists.img,
      filter
    };

    await Book.findByIdAndUpdate(id, data);

    return { success: true };   
}

export const deleteBook = async (id: string) => {
    await connectDb();  
    const book = await Book.findById(id);
    if (book) {
        await deleteImage(book.img);
        await Book.findByIdAndDelete(id);

        revalidatePath('/admin/books');

        return { success: true };
    } else {
        return { success: false };
    }   
}

export const searchBooks = async (searchQuery: string) => {
  const query = searchQuery.trim();
  const regex = new RegExp(query, "i");

  const booksDoc = await Book.find(
    { title: { $regex: regex } },
    "title img"
  )
    .sort({ createdAt: -1 })
    .lean();

  const books = booksDoc.map(book => {
    return {...book, _id: book._id.toString()}
  })

  return books;
}

export const getChildrenBooks = async (filters: string[] = [], {page = 1, limit = 10}: Pagination): 
  Promise<{ findBooks: BookType[]; totalPages: number; }
> => {
  const category = await Category.findOne({ name: "Knjige za decu" }).lean();

  if (!category) {
    return {
      findBooks: [],
      totalPages: 1
    }
  }

  const query: {
    category: mongoose.Types.ObjectId;
    filter?: { $in: string[] };
  } = {
    category: category._id,
  };

  if (filters.length > 0) {
    query.filter = { $in: filters };
  }

  const skip = (page - 1) * limit;

  const booksDoc = await Book.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  const books = booksDoc.map((book) => ({
    ...book,
    _id: book._id.toString(),
    category: book.category.toString(),
    filter: book.filter ? book.filter.toString() : "",
  }));

  const totalBooks = (await Book.find(query).lean()).length
  const totalPages = Math.ceil(totalBooks / limit)

  return {
    findBooks: books,
    totalPages
  };
};









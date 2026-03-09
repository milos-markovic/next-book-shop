'use client'

import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"

type DeleteBtnProps = {
    action: (id: string) => Promise<{ success: boolean; }>;
    id: string;
    variant?: "link" | "outline" | "default" | "destructive" | "secondary" | "ghost" | null | undefined,
    title?: string;
    deleteMessage?: string;
    dialogMessage?: string;
}

const DeleteBtn = ({ action, id, variant, title, deleteMessage, dialogMessage }: DeleteBtnProps) => {
  const handleDelete = async () => {
    const result = await action(id);
    if (result.success) {
      toast(deleteMessage || "Item deleted successfully");
    } else {
      toast.error("Failed to delete item");
    }
  }
    
  return (
     <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant || "link"} className="text-red-500 hover:cursor-pointer">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title || "Delete Item"}</AlertDialogTitle>
          <AlertDialogDescription className='text-left'>
            {dialogMessage || "Are you sure you want to delete this item? This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteBtn
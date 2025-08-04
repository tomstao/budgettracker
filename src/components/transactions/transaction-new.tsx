"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Loader2 } from "lucide-react"
import {toast} from "sonner";

// Define the validation schema
const transactionSchema = z.object({
    expenseContent: z.string().min(1, "Expense content is required").max(100, "Expense content must be less than 100 characters"),
    expenseType: z.string().min(1, "Expense type is required").max(50, "Expense type must be less than 50 characters"),
    expenseDescription: z.string().min(1, "Description is required").max(200, "Description must be less than 200 characters"),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Amount must be a positive number",
    }),
})

type TransactionFormData = z.infer<typeof transactionSchema>

export function NewTransaction() {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            expenseContent: "Daily expense",
            expenseType: "",
            expenseDescription: "",
            amount: "",
        },
    })

    const onSubmit = async (data: TransactionFormData) => {
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: data.expenseContent,
                    type: data.expenseType,
                    description: data.expenseDescription,
                    amount: parseFloat(data.amount),
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to create transaction")
            }

            const result = await response.json()

            toast.success("Transaction successfully created")

            reset()
            setOpen(false)
        } catch (error) {
            toast.error("Failed to create transaction. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">
                    <Plus className="h-4 w-4 mr-2" />
                    New Transaction
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Add New Transaction</DialogTitle>
                        <DialogDescription>
                            Add new transaction to your tracker. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="expense-content">Expense content</Label>
                            <Input
                                id="expense-content"
                                {...register("expenseContent")}
                                disabled={isSubmitting}
                            />
                            {errors.expenseContent && (
                                <p className="text-sm text-red-500">{errors.expenseContent.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="expense-type">Expense type</Label>
                            <Input
                                id="expense-type"
                                {...register("expenseType")}
                                placeholder="e.g. Food & Dining"
                                disabled={isSubmitting}
                            />
                            {errors.expenseType && (
                                <p className="text-sm text-red-500">{errors.expenseType.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="expense-description">Expense description</Label>
                            <Input
                                id="expense-description"
                                {...register("expenseDescription")}
                                placeholder="Weekly grocery shopping at Walmart"
                                disabled={isSubmitting}
                            />
                            {errors.expenseDescription && (
                                <p className="text-sm text-red-500">{errors.expenseDescription.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                {...register("amount")}
                                placeholder="0.00"
                                disabled={isSubmitting}
                            />
                            {errors.amount && (
                                <p className="text-sm text-red-500">{errors.amount.message}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button" disabled={isSubmitting}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save changes"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { categorySchema, CategoryFormData } from "@/lib/validators/category"
import { API_BASE_URL } from "@/lib/config"
import { getAuthHeaders } from "@/lib/auth"

const colorOptions = [
    { name: "Red", value: "#FF6B6B" },
    { name: "Blue", value: "#4ECDC4" },
    { name: "Green", value: "#45B7D1" },
    { name: "Yellow", value: "#96CEB4" },
    { name: "Orange", value: "#FFEAA7" },
    { name: "Purple", value: "#A8E6CF" },
    { name: "Pink", value: "#FFD93D" },
    { name: "Teal", value: "#74B9FF" },
]

const iconOptions = [
    { name: "Food", value: "🍽️" },
    { name: "Transport", value: "🚗" },
    { name: "Shopping", value: "🛍️" },
    { name: "Entertainment", value: "🎬" },
    { name: "Health", value: "💊" },
    { name: "Money", value: "💰" },
    { name: "Work", value: "💼" },
    { name: "Home", value: "🏠" },
    { name: "Education", value: "📚" },
    { name: "Travel", value: "✈️" },
]

export function NewCategory() {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            type: "expense",
            color: "#FF6B6B",
            icon: "🍽️",
        },
    })

    const selectedColor = watch("color")
    const selectedIcon = watch("icon")

    const onSubmit = async (data: CategoryFormData) => {
        setIsSubmitting(true)

        try {
            const response = await fetch(`${API_BASE_URL}/categories`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result?.message || "Failed to create category")
            }

            toast.success(`Category added: ${data.name}`)

            reset()
            setOpen(false)
        } catch (error: any) {
            toast.error(error.message || "Failed to create category. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(val) => {
                setOpen(val)
                if (!val) reset()
            }}
        >
            <DialogTrigger asChild>
                <Button variant="default">
                    <Plus className="h-4 w-4 mr-2" />
                    New Category
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>
                            Create a new category for organizing your transactions.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Category Name</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                placeholder="e.g. Food & Dining"
                                disabled={isSubmitting}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="type">Category Type</Label>
                            <Select onValueChange={(value: "income" | "expense") => setValue("type", value)} defaultValue="expense">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="income">Income</SelectItem>
                                    <SelectItem value="expense">Expense</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && (
                                <p className="text-sm text-destructive">{errors.type.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="color">Color</Label>
                            <div className="grid grid-cols-4 gap-2">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        className={`w-12 h-12 rounded-lg border-2 transition-all ${
                                            selectedColor === color.value
                                                ? "border-primary scale-110"
                                                : "border-transparent hover:border-gray-300"
                                        }`}
                                        style={{ backgroundColor: color.value }}
                                        onClick={() => setValue("color", color.value)}
                                        disabled={isSubmitting}
                                    />
                                ))}
                            </div>
                            {errors.color && (
                                <p className="text-sm text-destructive">{errors.color.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="icon">Icon</Label>
                            <div className="grid grid-cols-5 gap-2">
                                {iconOptions.map((icon) => (
                                    <button
                                        key={icon.value}
                                        type="button"
                                        className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-2xl transition-all ${
                                            selectedIcon === icon.value
                                                ? "border-primary bg-primary/10"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                        onClick={() => setValue("icon", icon.value)}
                                        disabled={isSubmitting}
                                    >
                                        {icon.value}
                                    </button>
                                ))}
                            </div>
                            {errors.icon && (
                                <p className="text-sm text-destructive">{errors.icon.message}</p>
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
                                "Save Category"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
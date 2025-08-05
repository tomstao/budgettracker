"use client"

import { useState, useEffect } from "react"
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
import { budgetSchema, BudgetFormData } from "@/lib/validators/budget"
import { API_BASE_URL } from "@/lib/config"
import { getAuthHeaders, mockLogin, addCacheBuster } from "@/lib/auth"

interface Category {
    id: string
    name: string
    type: "income" | "expense"
}

export function NewBudget() {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<BudgetFormData>({
        resolver: zodResolver(budgetSchema),
        defaultValues: {
            name: "",
            amount: "",
            categoryId: "",
            period: "monthly",
            startDate: new Date().toISOString().split('T')[0],
            endDate: "",
        },
    })

    const period = watch("period")
    const startDate = watch("startDate")

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (startDate && period) {
            const start = new Date(startDate)
            let end: Date
            
            if (period === "monthly") {
                end = new Date(start.getFullYear(), start.getMonth() + 1, 0)
            } else {
                end = new Date(start.getFullYear() + 1, start.getMonth(), start.getDate() - 1)
            }
            
            setValue("endDate", end.toISOString().split('T')[0])
        }
    }, [period, startDate, setValue])

    const fetchCategories = async () => {
        try {
            const url = addCacheBuster(`${API_BASE_URL}/categories`)
            const response = await fetch(url, {
                headers: getAuthHeaders()
            })
            if (response.status === 401) {
                await mockLogin()
                const retryUrl = addCacheBuster(`${API_BASE_URL}/categories`)
                const retryResponse = await fetch(retryUrl, {
                    headers: getAuthHeaders()
                })
                if (retryResponse.ok) {
                    const data = await retryResponse.json()
                    setCategories(data.filter((cat: Category) => cat.type === "expense"))
                }
                return
            }
            if (response.ok) {
                const data = await response.json()
                setCategories(data.filter((cat: Category) => cat.type === "expense"))
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error)
        }
    }

    const onSubmit = async (data: BudgetFormData) => {
        setIsSubmitting(true)

        try {
            const response = await fetch(`${API_BASE_URL}/budgets`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    name: data.name,
                    amount: parseFloat(data.amount),
                    categoryId: data.categoryId,
                    period: data.period,
                    startDate: data.startDate,
                    endDate: data.endDate,
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result?.message || "Failed to create budget")
            }

            toast.success(`Budget created: ${data.name}`)

            reset()
            setOpen(false)
        } catch (error: any) {
            toast.error(error.message || "Failed to create budget. Please try again.")
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
                    New Budget
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Add New Budget</DialogTitle>
                        <DialogDescription>
                            Create a budget to track spending for a specific category.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Budget Name</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                placeholder="e.g. Monthly Food Budget"
                                disabled={isSubmitting}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Budget Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                {...register("amount")}
                                placeholder="0.00"
                                disabled={isSubmitting}
                            />
                            {errors.amount && (
                                <p className="text-sm text-destructive">{errors.amount.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="categoryId">Category</Label>
                            <Select onValueChange={(value) => setValue("categoryId", value)} disabled={isSubmitting}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.categoryId && (
                                <p className="text-sm text-destructive">{errors.categoryId.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="period">Budget Period</Label>
                            <Select onValueChange={(value: "monthly" | "yearly") => setValue("period", value)} defaultValue="monthly">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select budget period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="yearly">Yearly</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.period && (
                                <p className="text-sm text-destructive">{errors.period.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                                id="startDate"
                                type="date"
                                {...register("startDate")}
                                disabled={isSubmitting}
                            />
                            {errors.startDate && (
                                <p className="text-sm text-destructive">{errors.startDate.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                                id="endDate"
                                type="date"
                                {...register("endDate")}
                                disabled={isSubmitting}
                                readOnly
                            />
                            {errors.endDate && (
                                <p className="text-sm text-destructive">{errors.endDate.message}</p>
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
                                "Save Budget"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
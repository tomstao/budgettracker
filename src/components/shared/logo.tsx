import {BarChart3} from "lucide-react";
import Link from "next/link";

export function Logo() {
    return (
        <Link href="/">

            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary-foreground"/>
                </div>
                <span className="text-xl font-bold text-foreground">
        ExpenseTracker
      </span>
            </div>
        </Link>

    );
}
'use client'

import { Id } from "@/convex/_generated/dataModel";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
    documentId: Id<"documents">;
}

export const Menu = ({documentId}: MenuProps) => {
    const {user} = useUser();
    const router = useRouter();

    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
        const promise = archive({id: documentId});

        toast.promise(promise, {
            loading: 'Archiving...',
            success: 'Document archived',
            error: 'Error archiving document',
        });
    }

    return(
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
                    <DropdownMenuItem onClick={onArchive}>
                        <Trash className="h-4 w-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <div className="text-xs text-muted-foreground">
                        Last edited by: {user?.fullName}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
    );
};

Menu.Skeleton = function MenuSkeleton() {
    return(
        <Skeleton className="h-10 w-10"/>
    )
}
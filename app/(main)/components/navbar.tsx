'use client'

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import { Title } from "@/app/(main)/components/title";


interface NavbarProps {
    isCollapsed?: boolean;
    onResetWidth?: () => void;
};

export const Navbar = ({
    isCollapsed,
    onResetWidth
}: NavbarProps) => {    

    const param = useParams();

    const documents = useQuery(api.documents.getById, {documentId: param.documentId as Id<"documents">});

    if(documents === undefined) {
        return (
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center">
                <Title.Skeleton/>
            </nav>
        )
    }



    return(
        <>
        <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
            {isCollapsed && (
                <MenuIcon
                    role="button"
                    onClick={onResetWidth}
                    className="h-6 w-6 text-muted-foreground"
                />
            )}
            <div className="flex items-center justify-between w-full">
                <Title initialData={documents}/>
            </div>
        </nav>
        </>
    )
}
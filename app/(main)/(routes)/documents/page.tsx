'use client';

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import {api} from "@/convex/_generated/api"
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
const DocumentsPage = () => {
    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({ title: "Untitled" });

        toast.promise(promise,{
            loading: "Creating a new note...",
            success: "Note created",
            error: "Failed to create a note"
        })
    }
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/empty.png"
                height="300"
                width="300"
                alt="Empty"
                className="dark:hidden"
            />
            <Image
                src="/empty-dark.png"
                height="300"
                width="300"
                alt="Empty"
                className="hidden dark:block"
            />

            <h2>
                Welcome to {user?.firstName}&apos;s JNotei
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="w-4 h-4 mr-2"/>
                Create a note
            </Button>
        </div>
    )
}
export default DocumentsPage;
'use client'

import { ConfirmModal } from '@/components/modal/confirm-modal';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { Search, Trash, Undo } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner';

export const TrashBox  = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const deleteDocument = useMutation(api.documents.deleteDocument);

    const [serach, setSearch] = useState("");

    const filterDocuments = documents?.filter((doc) => {
        if(serach) {
            return doc.title.toLowerCase().includes(serach.toLowerCase());
        }
        return true;
    });

    const onClick = (documentId: string) => {
        router.push('/documents/${documentId}');
    }

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">
    ) => {
        event.stopPropagation();
        const promise = restore({id: documentId});

        toast.promise(promise, {
            loading: 'Restoring...',
            success: 'Document restored',
            error: 'Error restoring document',
        });
    }

    const onDelete = (
        documentId: Id<"documents">
    ) => {
        const promise = deleteDocument({id: documentId});

        toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Document deleted',
            error: 'Error deleteing document',
        });

        if (params.documentId === documentId) {
            router.push('/documents');
        }
    };

    if(documents === undefined) {
        return (
            <div className='h-full flex items-center justify-center p-4'>
                <Spinner size="lg"/>
            </div>
        )
    }


  return (
    <div className='text-sm'>
        <div className='flex items-center gap-x-1 p-2'>
            <Search  className='w-4 h-4'/>
            <Input 
                placeholder='Search' 
                value={serach} 
                onChange={(e) => 
                setSearch(e.target.value)}
                className='h-7 px-2 focus-visible:right-transparent bg-secondary'
            />
        </div>
        <div className='mt-2 px-1 pb-1'>
            <p className='hidden last:block text-xs text-center text-muted-foreground pb-2'>
                No documents found.
            </p>
            {filterDocuments?.map((doc) => (
                <div
                    key={doc._id}
                    role='button'
                    onClick={() => onClick(doc._id)}
                    className='text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between'
                >
                    <span className='truncate pl-2'>
                        {doc.title}
                    </span>
                    <div className='flex items-center'>
                        <div 
                            onClick={(e) => onRestore(e, doc._id)}
                            role='button'
                            className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'>
                            <Undo className='w-4 h-4 text-muted-foreground'/>
                        </div>
                        <ConfirmModal onConfirm={() => onDelete(doc._id)}>
                        <div
                            role='button'
                            className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                        >
                            <Trash className='w-4 h-4 text-muted-foreground'/>
                        </div>
                        </ConfirmModal>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

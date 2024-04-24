'use client'
import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils";
import Logo from "@/app/(marketing)/components/logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
const Navbar = () => {
    const { isAuthenticated, isLoading} = useConvexAuth();
    const scrolled = useScrollTop();
    return (
        <div className={cn("flex items-center z-50 bg-background dark:bg-[#1f1f1f] fixed w-full top-0 p-6", scrolled && "border-b shadow-sm")}>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <Spinner/>
                )}
                {!isAuthenticated && !isLoading &&(
                    <>
                        <SignInButton mode="modal">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                        <Button size="sm">
                            Get JNotie free
                        </Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/documents">Enter JNotei</Link>
                        </Button>
                        <UserButton afterSignOutUrl="/"/>
                    </>
                )}
                <ModeToggle/>
            </div>
        </div>
  )
}

export default Navbar
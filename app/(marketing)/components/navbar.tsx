'use client'
import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils";
import Logo from "@/app/(marketing)/components/logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
const Navbar = () => {
    const scrolled = useScrollTop();
    return (
        <div className={cn("flex items-center z-50 bg-background dark:bg-[#1f1f1f] fixed w-full top-0 p-6", scrolled && "border-b shadow-sm")}>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                <ModeToggle/>
            </div>
        </div>
  )
}

export default Navbar
import Image from "next/image"
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const Font = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const Logo = ({}) => {
    return(
        <div className="hidden md:flex flex-center gap-x-2">
            <Image
                src="./logo.svg"
                height="40"
                width="40"
                alt='Logo'
                className="dark:hidden"
            />
            <Image
                src="./logo-dark.svg"
                height="40"
                width="40"
                alt='Logo'
                className="hidden dark:block"
            />
            <p className={cn("font-bold", Font.className)}>
                JNotei
            </p>
        </div>
    )
}
export default Logo;
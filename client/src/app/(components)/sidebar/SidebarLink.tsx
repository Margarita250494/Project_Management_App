import { LucideIcon } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation"




interface SidebarLinkProps{
  href:string,
  icon:LucideIcon,
  label:string,
}

export const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {

  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <li role="none">
      <Link href={href} className="w-full">
        <div
          className={`w-full relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
            isActive ? "bg-gray-200 text-white dark:bg-gray-600" : ""
          } justify-start px-8 py-3`}
          role="menuitem"
          aria-current={isActive ? "page" : undefined}
        >
          {isActive && <div className="absolute left-0 top-0 h-full w-[5px] bg-blue-200" aria-hidden="true" />}
          <Icon strokeWidth={1.5} className="h-6 w-6 text-gray-800 dark:text-gray-100" role="img" aria-label={`${label} icon`} />
          <span className="font-medium text-gray-800 dark:text-gray-100">{label}</span>
        </div>
      </Link>
    </li>
  )
}


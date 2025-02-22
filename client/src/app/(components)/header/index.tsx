import { ReactNode } from "react"


type Props = {
    name:string,
    buttonComponent?:ReactNode,
    isSmallText?:boolean

}

export const Header = ({name,buttonComponent,isSmallText=false}: Props) => {
  return (
    <header className="mb-5 flex w-full items-center justify-between">
        <h1 className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold dark:text-white`}>
            {name}
        </h1>
        {buttonComponent}
    </header>
  )
}


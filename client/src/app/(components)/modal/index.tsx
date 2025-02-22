import React from 'react'
import { Header } from '../header'
import ReactDOM from "react-dom"
import { EyeClosed } from 'lucide-react'


type ModalProps = {
    children: React.ReactNode,
    isOpen:boolean,
    onClose:()=>void,
    name:string
}

export const Modal = ({children,isOpen,onClose,name}: ModalProps) => {

    if(!isOpen) return null

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-90 p-4">
        <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary">
            <Header
            name={name}
            buttonComponent={
                <button className="flex h-7 w-7 items-center justify-center text-gray-800 dark:text-white dark:hover:text-blue-400 hover:text-blue-600"
                onClick={onClose}>
                    <EyeClosed size={18} strokeWidth={1.5}/>
                </button>
            }
            isSmallText/>
            {children}
        </div>
    </div>, document.body
  );
}


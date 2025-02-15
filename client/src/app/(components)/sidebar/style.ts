export const animationList = (show:boolean) => ({
    initial:{opacity: 0, y: -10, height: 0},
    animate:{
        opacity: show ? 1 : 0,
        y: show ? 0 : -10,
        height: show ? "auto" : 0
    },
    exit:{ opacity: 0, y: -10, height: 0 },
    transition:{ duration: 0.3, ease: "easeInOut"}
})

export const getSidebarStyle = (isSidebarCollapsed:boolean) => {
    return `fixed flex flex-col h-full justify-between shadow-xl transition-transform duration-300 z-40 dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? "-translate-x-full" : "translate-x-0 w-64"}`
}


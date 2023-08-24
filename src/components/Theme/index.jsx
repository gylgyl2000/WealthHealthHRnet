import { useEffect, useState } from "react";

const lightTheme = "light"
const darkTheme = "dark"

export default function useTheme() {
    const defaultMode = darkTheme
    const [theme, setTheme] = useState(darkTheme)
    useEffect(() => {
        setTheme(defaultMode ? darkTheme : lightTheme)
    }, [defaultMode])
  
    return theme
}
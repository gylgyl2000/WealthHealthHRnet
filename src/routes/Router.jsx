import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import CurrentEmployees from '../pages/CurrentEmployees'
import CreateEmployee from '../pages/CreateEmployee'
import Error404 from '../pages/Error404'
import Header from '../layouts/Header'
import Footer from '../components/Footer'
import { copyright } from '../infos'

import { CustomProvider } from 'rsuite'
import { useState, useEffect } from 'react'

import { enUS } from 'rsuite/esm/locales'
import "rsuite/styles/index.less"

export default function Router() {
    const [theme, setTheme] = useState("dark")

    const handleToggle = () => {
        const storeUserSetPreference = (pref) => {
            localStorage.setItem("theme", pref)
        }
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        storeUserSetPreference(newTheme)
    }
    
    const getUserSetPreference = () => {
        return localStorage.getItem("theme")
    }
    useEffect(() => {
        const userSetPreference = getUserSetPreference()
        if (userSetPreference) {
            setTheme(userSetPreference)
        }
        console.log(theme)
    }, [theme])
    
    return (
        <BrowserRouter>
            <CustomProvider theme={theme} locale={enUS}>
                <Header handle={handleToggle}/>
                <Routes>
                    <Route path='/WealthHealthHRnet/' element={<Home />} />
                    <Route path='/WealthHealthHRnet/current-employees' element={<CurrentEmployees />} />
                    <Route path='/WealthHealthHRnet/create-employee' element={<CreateEmployee />} />
                    <Route path='*' element={<Error404 />} />
                </Routes>
                <Footer text={copyright.text} />
                
            </CustomProvider>
        </BrowserRouter>
    )
}
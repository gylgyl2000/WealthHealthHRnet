import { useDispatch } from 'react-redux'
import { getEmployees } from '../../features/employeesSlice'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import CreateForm from '../../layouts/CreateForm'
import Moodal from '../../components/Modal'
import { useNavigate } from 'react-router-dom'

export default function CreateEmployee() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    
    const navigateCurrentEmployeesPage = () => {
        dispatch(getEmployees())
        navigate('/WealthHealthHRnet/current-employees')
    }
    useEffect(() => {
        try {
            dispatch(getEmployees())
        } catch (error) {
            console.log('ERROR GETTING EMPLOYEES DATA -', error)
        }
    }, [dispatch])

    return (
        <MainForm>
            <h2>Create Employee</h2>
            <CreateForm handleOpen={handleOpen} />
            <Moodal
                open={open}
                handleClose={handleClose}
                message='Employee successfully created!'
                action={navigateCurrentEmployeesPage}
            />
        </MainForm>
    )
}

const MainForm = styled.main`
    width: 80vw;
    margin: 0 auto;
    height: 84vh;
    & h2 {
        text-align: center;
        padding: 5vh 0;
    }
    @media (min-width: 1281px) {
        width: 63vw;
    }
`
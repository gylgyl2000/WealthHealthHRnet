import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { statusSelector } from '../utils/selectors'

// Employees initial state
const initialState = {
    status: 'void',
    error: null,
    infos: [],
    imageUrl: ''
}

/* ---- Functions & Middleware Thunks to dispatch actions in user reducer ---- */

export function uploadFile(value) {
    return async (dispatch) => {
        const formData = new FormData();
        formData.append("fileToUpload", value);
        try {
            const response = await axios.post('http://localhost:4001/submit',
                formData
            )
            const data = response.data
            console.log(data)
            dispatch(uploadedFile(data))
        } catch (error) {
            console.log('ERROR CONNECTING -', error)
            dispatch(rejected(error.message))
        }
    }
}

export function getEmployees() {
    return async (dispatch, getState) => {
        const status = statusSelector(getState())
        if (status !== 'connected' && status !== 'void') {
            console.log('EXITING / Status -', status)
            return
        }
        dispatch(fetching())
        try {
            const response = await axios.get('http://localhost:4001/employees/all')
            const data = await response.data
            console.log(data)
            dispatch(resolvedEmployees(data))
        } catch (error) {
            console.log('ERROR CONNECTING -', error)
            dispatch(rejected(error.message))
        }
    }
}

export function createEmployee(values) {
    return async (dispatch, getState) => {
        const status = statusSelector(getState())
        if (status !== 'connected' && status !== 'void') {
            console.log('EXITING / Status -', status)
            return
        }
        dispatch(fetching())
        try {
            const response = await axios.post('http://localhost:4001/employees/create',
                { 
                    avatar: values.avatar,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    dateOfBirth: values.dateOfBirth.toLocaleDateString("en-GB"),
                    startDate: values.startDate.toLocaleDateString("en-GB"),
                    street: values.street,
                    city: values.city,
                    state: values.state,
                    zipCode: values.zipCode,
                    department: values.department
                }
            )
            const data = response.data
            dispatch(savedEmployee(data))
            dispatch(resolvedEmployees(data))
            dispatch(getEmployees())
        } catch (error) {
            console.log('ERROR CONNECTING -', error)
            dispatch(rejected(error.message))
        }
    }
}

export function updateEmployee(values) {
    return async (dispatch) => {
        try {
            const response = await axios.put('http://localhost:4001/employees/update',
                { 
                    id: values.id,
                    avatar: values.avatar,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    dateOfBirth: values.dateOfBirth,
                    startDate: values.startDate,
                    street: values.street,
                    city: values.city,
                    state: values.state,
                    zipCode: values.zipCode,
                    department: values.department
                }
            )
            const data = response.data
            dispatch(updatedEmployee(data))
            dispatch(getEmployees())
        } catch (error) {
            console.log('ERROR CONNECTING -', error)
            dispatch(rejected(error.message))
        }
    }
}

export function deleteEmployee(id) {
    return async (dispatch) => {
        try {
            const response = await axios.put('http://localhost:4001/employees/delete',
            { id: id })
            const data = await response.data
            dispatch(deletedEmployee(data, id))
            dispatch(getEmployees())
        } catch (error) {
            console.log('ERROR CONNECTING -', error)
            dispatch(rejected(error.message))
        }
    }
}

const { actions, reducer } = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        init: (draft) => {
            draft.status = 'void'
            draft.infos = initialState.infos
            return
        },
        fetching: (draft) => {
            draft.error = null
            if (draft.status === 'resolved') {
                draft.status = 'updating'
                return
            } else {
                draft.status = 'pending'
                return
            }
        },
        resolvedEmployees: {
            prepare: (data = initialState.infos) => ({
                payload: { data }
            }),
            reducer: (draft, action) => {
                console.log('RESOLVED Employees -', action.payload);
                draft.infos = action.payload
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.status = 'connected'
                    draft.infos = action.payload.data
                }
                return
            }
        },
        savedEmployee: {
            prepare: (data = initialState.infos) => ({
                payload: { data }
            }),
            reducer: (draft, action) => {
                draft.infos = [...draft.infos, action.payload.data]
                return
            }
        },
        deletedEmployee: {
            prepare: (data = initialState.infos, id) => ({
                payload: { data, id }
            }),
            reducer: (draft, action) => {
                const id = action.payload.id
                draft.infos = draft.infos.filter(el => el.id !== action.payload.id)
                console.log(`Employee ${id} successfully deleted!`)
                return
            }
        },
        updatedEmployee: {
            prepare: (data = initialState.infos) => ({
                payload: { data }
            }),
            reducer: (draft, action) => {
                const index = draft.infos.findIndex(employee => employee.id === action.payload.id)
                draft.infos[index] = {
                    ...draft.infos[index],
                    ...action.payload
                }
                console.log(`Employee successfully updated!`)
                return 
            }
        },
        uploadedFile: {
            prepare: (data = initialState) => ({
                payload: { data }
            }),
            reducer: (draft, action) => {
                draft.avatar = action.payload
            }
        },
        rejected: {
            prepare: (error) => ({
                payload: { error }
            }),
            reducer: (draft, action) => {
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.status = 'rejected'
                    draft.error = action.payload.error
                    return
                }
                return
            }
        },
    }
})

// Actions & Reducer from CreateSlice()
export const {
    fetching,
    resolvedEmployees,
    savedEmployee,
    deletedEmployee,
    updatedEmployee,
    uploadedFile,
    rejected,
} = actions
export default reducer
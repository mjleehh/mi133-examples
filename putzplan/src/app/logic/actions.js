import axios from 'axios'

// plain actions

// ui

export const OPEN_TASKS_TAB = 'UI/OPEN_TASKS_TAB'
export const openTasksTab = () => ({type: OPEN_TASKS_TAB})

export const OPEN_RESIDENTS_TAB = 'UI/OPEN_RESIDENTS_TAB'
export const openResidentsTab = () => ({type: OPEN_RESIDENTS_TAB})

export const OPEN_ADD_TASK_DIALOG = 'UI/OPEN_ADD_TASK_DIALOG'
export const openAddTaskDialog = () => ({type: OPEN_ADD_TASK_DIALOG})

export const OPEN_ADD_RESIDENT_DIALOG = 'UI/OPEN_ADD_RESIDENT_DIALOG'
export const openAddResidentDialog = () => ({type: OPEN_ADD_RESIDENT_DIALOG})

export const CLOSE_DIALOG = 'UI/CLOSE_DIALOG'
export const closeDialog = () => ({type: CLOSE_DIALOG})

// data

// residents
export const SET_RESIDENTS = 'DATA/SET_RESIDENTS'
export const setResidents = residents => ({type: SET_RESIDENTS, payload: residents})

export const CHANGE_RESIDENT_NAME = 'DATA/CHANGE_RESIDENT_NAME'
export const changeResidentName = (_id, name) => ({type: CHANGE_RESIDENT_NAME, payload: {_id, name}})

export const CHANGE_RESIDENT_SURNAME = 'DATA/CHANGE_RESIDENT_SURNAME'
export const changeResidentSurname = (_id, surname) => ({type: CHANGE_RESIDENT_SURNAME, payload: {_id, surname}})

// tasks
export const SET_TASKS = 'DATA/SET_TASKS'
export const setTasks = tasks => ({type: SET_TASKS, payload: tasks})

export const REMOVE_TASK = 'DATA/REMOVE_TASK'
export const removeTask = _id => ({type: REMOVE_TASK, payload: _id})


// thunks

// residents
export const requestSetTasks = () => async dispatch => {
    try {
        const {data: {tasks}} = await axios.get('/api/tasks')
        dispatch(setTasks(tasks))
    } catch (e) {
        console.error(e)
    }
}

export const requestSetResidents = () => async dispatch => {
    try {
        const {data: {residents}} = await axios.get('/api/residents')
        dispatch(setResidents(residents))
    } catch (e) {
        console.error(e)
    }
}

export const requestAddResident = (name, surname) => async dispatch => {
    try {
        await axios.post('/api/resident', {name, surname})
        dispatch(requestSetResidents())
    } catch (e) {
        console.error(e)
    }
}

export const requestChangeResidentName = (_id, name) => async dispatch => {
    try {
        await axios.put(`/api/resident/${_id}/name`, {name})
        dispatch(changeResidentName(_id, name))
    } catch (e) {
        console.error(e)
    }
}

export const requestChangeResidentSurname = (_id, surname) => async dispatch => {
    try {
        await axios.put(`/api/resident/${_id}/surname`, {surname})
        dispatch(changeResidentSurname(_id, surname))
    } catch (e) {
        console.error(e)
    }
}

export const requestRemoveResident = _id => async dispatch => {
    try {
        await axios.delete(`/api/resident/${_id}`)
        dispatch(requestSetResidents())
    } catch (e) {
        console.error(e)
    }
}

// tasks
export const requestAddTask = (description, firstResident, startDate) => async dispatch => {
    try {
        await axios.post('/api/task', {description, firstResident, startDate})
        dispatch(requestSetTasks())
    } catch (e) {
        console.error(e)
    }
}

export const requestRemoveTask = _id => async dispatch => {
    try {
        await axios.delete(`/api/task/${_id}`)
        dispatch(requestSetTasks())
    } catch (e) {
        console.error(e)
    }
}

import {
    OPEN_ADD_RESIDENT_DIALOG,
    OPEN_ADD_TASK_DIALOG,
    CLOSE_DIALOG,
    SET_RESIDENTS,
    SET_TASKS,
    OPEN_TASKS_TAB,
    OPEN_RESIDENTS_TAB,
    CHANGE_RESIDENT_NAME,
    CHANGE_RESIDENT_SURNAME,
    CHANGE_TASK_DESCRIPTION,
} from './actions'
import {DIALOG_ADD_RESIDENT, DIALOG_ADD_TASK, TAB_RESIDENTS, TAB_TASKS} from './constants'

const initialState = () => ({
    ui: {
        dialog: null,
        tab: TAB_TASKS,
    },
    data: {
        residents: [],
        tasks: [],
    },
})

function uiReducer(uiState, {type}) {
    switch (type) {
        case OPEN_ADD_RESIDENT_DIALOG: {
            return {...uiState, dialog: DIALOG_ADD_RESIDENT}
        }
        case OPEN_ADD_TASK_DIALOG: {
            return {...uiState, dialog: DIALOG_ADD_TASK}
        }
        case CLOSE_DIALOG: {
            return {...uiState, dialog: null}
        }
        case OPEN_TASKS_TAB: {
            return {...uiState, tab: TAB_TASKS}
        }
        case OPEN_RESIDENTS_TAB: {
            return {...uiState, tab: TAB_RESIDENTS}
        }
        default:
            return uiState
    }
}

function dataReducer(dataState, {type, payload}) {
    switch (type) {
        case SET_TASKS: {
            return {...dataState, tasks: payload}
        }
        case SET_RESIDENTS: {
            return {...dataState, residents: payload}
        }
        case CHANGE_RESIDENT_NAME: {
            const {_id, name} = payload
            const residents = dataState.residents.map(resident =>
                resident._id === _id
                    ? {...resident, name}
                    : resident
            )
            return {...dataState, residents}
        }
        case CHANGE_RESIDENT_SURNAME: {
            const {_id, surname} = payload
            const residents = dataState.residents.map(resident =>
                resident._id === _id
                    ? {...resident, surname}
                    : resident
            )
            return {...dataState, residents}
        }
        case CHANGE_TASK_DESCRIPTION: {
            const {_id, description} = payload
            const tasks = dataState.tasks.map(task =>
                task._id === _id
                    ? {...task, description}
                    : task
            )
            return {...dataState, tasks}
        }
        default:
            return dataState
    }
}

export default function reducer(state = initialState(), action) {
    const {type} = action
    if (type.startsWith('UI/')) {
        const ui = uiReducer(state.ui, action)
        return {...state, ui}
    } else if (type.startsWith('DATA/')) {
        const data = dataReducer(state.data, action)
        return {...state, data}
    } else {
        return state
    }
}

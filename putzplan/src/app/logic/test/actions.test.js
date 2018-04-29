import {
    changeResidentName, changeResidentSurname, changeTaskDescription,
    closeDialog,
    openAddResidentDialog,
    openAddTaskDialog,
    openResidentsTab,
    openTasksTab, removeTask,
    setResidents, setTasks
} from "../actions"
import {ResidentsGenerator, TaskGenerator} from "./utils"

describe('app actions', () => {
    it('has open tasks tab action', () => {
        const action = openTasksTab()

        expect(action).toHaveProperty('type', 'UI/OPEN_TASKS_TAB')
        expect(action).not.toHaveProperty('payload')
    })

    it('has open residents tab action', () => {
        const action = openResidentsTab()

        expect(action).toHaveProperty('type', 'UI/OPEN_RESIDENTS_TAB')
        expect(action).not.toHaveProperty('payload')
    })

    it('has open add task dialog action', () => {
        const action = openAddTaskDialog()

        expect(action).toHaveProperty('type', 'UI/OPEN_ADD_TASK_DIALOG')
        expect(action).not.toHaveProperty('payload')
    })

    it('has open add resident dialog action', () => {
        const action = openAddResidentDialog()

        expect(action).toHaveProperty('type', 'UI/OPEN_ADD_RESIDENT_DIALOG')
        expect(action).not.toHaveProperty('payload')
    })

    it('has close dialog action', () => {
        const action = closeDialog()

        expect(action).toHaveProperty('type', 'UI/CLOSE_DIALOG')
        expect(action).not.toHaveProperty('payload')
    })

    it('has set residents action', () => {
        const residents = [...ResidentsGenerator()]
        const action = setResidents(residents)

        expect(action).toHaveProperty('type', 'DATA/SET_RESIDENTS')
        expect(action).toHaveProperty('payload', residents)
    })

    it('has change resident name action', () => {
        const action = changeResidentName('5ade08d55af1423599d5ce9c', 'Anewname')

        expect(action).toHaveProperty('type', 'DATA/CHANGE_RESIDENT_NAME')
        expect(action).toHaveProperty('payload', {
            _id: '5ade08d55af1423599d5ce9c',
            name: 'Anewname'
        })
    })

    it('has change resident surname action', () => {
        const action = changeResidentSurname('5ade08d55af1423599d5ce9c', 'Anewsurname')

        expect(action).toHaveProperty('type', 'DATA/CHANGE_RESIDENT_SURNAME')
        expect(action).toHaveProperty('payload', {
            _id: '5ade08d55af1423599d5ce9c',
            surname: 'Anewsurname'
        })
    })

    it('has set tasks action', () => {
        const tasks = [...TaskGenerator()]
        const action = setTasks(tasks)

        expect(action).toHaveProperty('type', 'DATA/SET_TASKS')
        expect(action).toHaveProperty('payload', tasks)
    })

    it('has change task description action', () => {
        const action = changeTaskDescription('5ade08e5eaf1423599d5ce9c', 'a new description')

        expect(action).toHaveProperty('type', 'DATA/CHANGE_TASK_DESCRIPTION')
        expect(action).toHaveProperty('payload', {
            _id: '5ade08e5eaf1423599d5ce9c',
            description: 'a new description',
        })
    })

    it('has remove task action', () => {
        const action = removeTask('5ade08e5eaf1423599d5ce9c')

        expect(action).toHaveProperty('type', 'DATA/REMOVE_TASK')
        expect(action).toHaveProperty('payload', '5ade08e5eaf1423599d5ce9c')
    })
})
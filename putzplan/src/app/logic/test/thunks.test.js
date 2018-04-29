import axios from 'axios'

import {TaskGenerator, next} from "./utils"
import {requestRemoveTask} from "../actions"

jest.mock('axios')

describe('app thunks', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('remove task thunk', () => {
        it('removes task from the backend and updates the state', () => {
            const res = next(TaskGenerator())
            const {_id} = res

            axios.delete.mockResolvedValue({data: res})
            const dispatch = jest.fn()

            return requestRemoveTask(_id)(dispatch).then(() => {
                const deleteCalls = axios.delete.mock.calls
                expect(deleteCalls.length).toBe(1)
                expect(deleteCalls[0][0]).toBe(`/api/task/${_id}`)

                const dispatchCalls = dispatch.mock.calls
                expect(dispatchCalls.length).toBe(1)
                expect(dispatchCalls[0][0]).toEqual({
                    type: 'DATA/REMOVE_TASK',
                    payload: _id
                })
            })
        })

        it('leaves the state unaltered on backend failure', () => {
            const res = next(TaskGenerator())
            const {_id} = res

            axios.delete.mockRejectedValue()
            const dispatch = jest.fn()

            return requestRemoveTask(_id)(dispatch).then(() => {
                const deleteCalls = axios.delete.mock.calls
                expect(deleteCalls.length).toBe(1)
                expect(deleteCalls[0][0]).toBe(`/api/task/${_id}`)

                const dispatchCalls = dispatch.mock.calls
                expect(dispatchCalls.length).toBe(0)
            })
        })
    })
})
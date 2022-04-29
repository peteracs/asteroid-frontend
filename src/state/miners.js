import {atom} from 'recoil'

export const minersState = atom({
    key: 'miners',
    default: []
})

export const minerStatusesState = atom({
    key: 'minerStatuses',
    default: {
        0: 'Idle',
        1: 'Travelling',
        2: 'Mining',
        3: 'Transferring',
    }
})
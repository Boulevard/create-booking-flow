/**
 * Local Storage Persistence for recoil states
 */

import isNode from 'detect-node'
import { RecoilState, useSetRecoilState } from 'recoil'

export function getPersistedState<T>(key: string): T | null {
    if (isNode) return null
    const state = localStorage.getItem(key)
    return !!state ? (JSON.parse(state) as T) : null
}

export function setPersistedState<T>(key: string, state: T) {
    localStorage.setItem(key, JSON.stringify(state))
}

export function deletePersistedState(key: string) {
    localStorage.removeItem(key)
}

export function makePersistedSetRecoilState<T>(
    key: string,
    atom: RecoilState<T>
) {
    return () => {
        const setRecoilState = useSetRecoilState(atom)
        return (newVal: T) => {
            setRecoilState(newVal)
            if (newVal === undefined) {
                deletePersistedState(key)
            } else {
                setPersistedState<T>(key, newVal)
            }
        }
    }
}

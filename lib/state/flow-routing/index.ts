import { useRecoilValue } from 'recoil'
import { initialStep } from 'lib/state/booking-flow/types'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import flowStepState, { useFlowStep } from 'lib/state/booking-flow'
import { getStepFromPath } from 'lib/utils/stepUtils'
import { useCartDataLoadedState, useCartMethods } from 'lib/state/cart'

export const useFlowRouting = () => {
    const router = useRouter()
    const { setRecoilStep } = useFlowStep()
    const currentFlowStep = useRecoilValue(flowStepState)
    const { getCartDataLoadedState } = useCartMethods()

    const handleHash = (pathname: string) => {
        if (!getCartDataLoadedState()) {
            return
        }
        let step = getStepFromPath(pathname, initialStep)
        if (step !== undefined) {
            if (currentFlowStep.step !== step) {
                setRecoilStep(step)
            }
        }
    }

    const handlePath = (pathname: string) => {
        if (!getCartDataLoadedState()) {
            return
        }
        if (pathname === '/' || pathname === '' || pathname === '/#') {
            if (currentFlowStep.step !== initialStep) {
                setRecoilStep(initialStep)
            }
        } else {
            handleHash(pathname)
        }
    }

    useEffect(() => {
        let cancel = false
        const onRouteChange = async (pathname: string) => {
            handlePath(pathname)
        }
        router.events.on('routeChangeComplete', onRouteChange)
        return () => {
            cancel = true
            router.events.off('routeChangeComplete', onRouteChange)
        }
        // eslint-disable-next-line
    }, [currentFlowStep])

    useEffect(() => {
        let cancel = false
        const onRouteChange = async (pathname: string) => {
            handleHash(pathname)
        }
        router.events.on('hashChangeComplete', onRouteChange)
        return () => {
            cancel = true
            router.events.off('hashChangeComplete', onRouteChange)
        }
        // eslint-disable-next-line
    }, [currentFlowStep])
}

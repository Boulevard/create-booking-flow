import React, { useState } from 'react'
import { LeftPanel } from 'components/molecules/Services/SelectService/LeftPanel'
import WithLayout from 'components/atoms/layout/WithLayout'
import {
    useAvailableCategories,
    useSelectedCartAvailableCategory,
    useSetSelectedCartAvailableCategory,
} from 'lib/state/services'
import { ServicesList } from 'components/molecules/Services/SelectService/ServicesList'
import { WorkshopPanel } from 'components/molecules/Services/SelectService/WorkshopPanel'

export const SelectServiceScreen = () => {
    const [searchString, setSearchString] = useState('')
    const initialAvailableCategories = useAvailableCategories()
    const [availableCategories, setAvailableCategories] = useState(
        initialAvailableCategories
    )
    const setSelectedCartAvailableCategory =
        useSetSelectedCartAvailableCategory()
    const selectedCartAvailableCategory = useSelectedCartAvailableCategory()

    const onSearchChange = (event) => {
        const search = event.target.value
        setSearchString(search)
        const categories = initialAvailableCategories.filter(
            (x) =>
                search === '' ||
                x.availableItems.some(
                    (ai) =>
                        ai.name.toLowerCase().indexOf(search.toLowerCase()) !==
                        -1
                )
        )
        setAvailableCategories(categories)
        if (
            !categories.find((x) => x.id === selectedCartAvailableCategory?.id)
        ) {
            setSelectedCartAvailableCategory(categories[0])
        }
    }

    const clear = async () => {
        await setSelectedCartAvailableCategory(initialAvailableCategories[0])
        await setAvailableCategories(initialAvailableCategories)
        await setSearchString('')
    }

    return (
        <WithLayout
            isShowLoader={false}
            leftPanel={
                <LeftPanel
                    availableCategories={availableCategories}
                    onSearchChange={onSearchChange}
                    searchString={searchString}
                    clear={clear}
                />
            }
            rightPanel={<ServicesList searchString={searchString} />}
            workshopPanel={<WorkshopPanel />}
        />
    )
}

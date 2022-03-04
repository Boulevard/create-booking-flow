import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import {
    useActiveSelectedService,
    useSelectedServices,
    useSetActiveSelectedService,
} from 'lib/state/services'
import {
    CustomMenuItem,
    useStyles,
} from 'components/molecules/MobileSelectedServiceSelector/useStyles'
import { useSelectedServiceChange } from 'components/molecules/Services/SelectedServices/useSelectedServiceChange'

export const MobileSelectedServiceSelector = () => {
    const activeSelectedService = useActiveSelectedService()
    const setActiveSelectedService = useSetActiveSelectedService()
    const { selectedServicesStateValue, reverseSelectedServices } =
        useSelectedServices()
    const reversedList = reverseSelectedServices(selectedServicesStateValue)
    const {handleServiceChange} = useSelectedServiceChange()

    const handleChange = async (event: SelectChangeEvent) => {
        const bookableItem = selectedServicesStateValue.find((x) => x.id === event.target.value)
        setActiveSelectedService(bookableItem)
        if (bookableItem) {
            await handleServiceChange(bookableItem)
        }
    }

    const classes = useStyles()
    return (
        <FormControl className={classes.formControl}>
            <Select
                value={activeSelectedService?.id}
                onChange={handleChange}
                variant="standard"
                classes={{
                    root: classes.selectRoot,
                    icon: classes.icon,
                }}
                MenuProps={{
                    sx: {
                        '& .MuiPaper-root': { left: '0!important' },
                    },
                }}
            >
                {reversedList?.map((cartItem) => (
                    <CustomMenuItem key={cartItem.id} value={cartItem.id}>
                        {cartItem.item.name}
                    </CustomMenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

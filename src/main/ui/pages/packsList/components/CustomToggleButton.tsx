import { Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../../bll/hooks"
import { setProfileIDAC } from "../../../../bll/searchReducer"

export const CustomToggleButton = () => {
    const dispatch = useAppDispatch()
    const profileID = useAppSelector(state => state.profile.profile._id)
    const search = useAppSelector(state => state.search)

    const handleChangeToggleButton = (event: React.MouseEvent<HTMLElement>, newAlignment: string,) => {
        if (newAlignment !== undefined) {
            dispatch(setProfileIDAC(newAlignment))
        }
    }

    return <Grid>
        <Typography>
            Show packs cards
        </Typography>
        <ToggleButtonGroup
            fullWidth
            value={search.profileID}
            exclusive
            onChange={handleChangeToggleButton}
            color="primary"
        >
            <ToggleButton value={profileID}>My</ToggleButton>
            <ToggleButton value={''}>All</ToggleButton>
        </ToggleButtonGroup>
    </Grid>
}
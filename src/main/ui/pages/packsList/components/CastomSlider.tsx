import {Grid, Slider, Typography} from "@mui/material"
import {useAppDispatch, useAppSelector} from "../../../../bll/hooks"
import {SyntheticEvent, useState} from "react"
import {setMinMaxAC} from "../../../../bll/searchReducer"

export const CustomSlider = () => {
    const dispatch = useAppDispatch()
    const search = useAppSelector(state => state.search)

    const [valueSlider, setValueSlider] = useState([search.min, search.max])

    const handleChangeSlider = (event: Event, newValue: number | number[]) => {
        setValueSlider(newValue as number[])
    }
    const handleChangeCommittedSlider = (event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
        dispatch(setMinMaxAC(value as number[]))
    }

    return <Grid>
        <Typography>
            Number of cards
        </Typography>
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center">
            <Slider
                value={valueSlider}
                onChange={handleChangeSlider}
                onChangeCommitted={handleChangeCommittedSlider}
                valueLabelDisplay="auto"
            />
        </Grid>
    </Grid>
}
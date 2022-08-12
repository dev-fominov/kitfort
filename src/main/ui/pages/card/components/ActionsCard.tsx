import {Grid, IconButton} from "@mui/material"
import {setAppOpenDiologsAC} from "../../../../bll/appReducer"
import {useAppDispatch, useAppSelector} from "../../../../bll/hooks"
import DeleteIcon from '@mui/icons-material/Delete'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import {setCardParamsAC} from "../../../../bll/cardsReducer"

export const ActionsCard = (props: any) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const profileID = useAppSelector(state => state.profile.profile._id)

    const onBtnDeleteCard = (card_id: string, question: string, answer: string) => {
        dispatch(setCardParamsAC({card_id, question, answer}))
        dispatch(setAppOpenDiologsAC('openDeleteCardDialogs'))
    }
    const onBtnUpdateCard = (card_id: string, question: string, answer: string) => {
        dispatch(setCardParamsAC({card_id, question, answer}))
        dispatch(setAppOpenDiologsAC('openUpdateCardDiologs'))
    }
    
    return <Grid>
        {profileID === props.cellValues.row.userID &&
        <IconButton
            disabled={status === 'loading'}
            onClick={(event) => {
                onBtnDeleteCard(props.cellValues.id, props.cellValues.row.question, props.cellValues.row.answer)
            }}
            color="primary">
          <DeleteIcon fontSize="small"/>
        </IconButton>}
        {profileID === props.cellValues.row.userID &&
        <IconButton
            disabled={status === 'loading'}
            onClick={(event) => {
                onBtnUpdateCard(props.cellValues.row.id, props.cellValues.row.question, props.cellValues.row.answer)
            }}
            color="primary">
          <BorderColorIcon fontSize="small"/>
        </IconButton>}
    </Grid>
}
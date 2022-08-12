import {Grid, IconButton} from "@mui/material"
import {setAppOpenDiologsAC} from "../../../../bll/appReducer"
import {useAppDispatch, useAppSelector} from "../../../../bll/hooks"
import {setPackNameIdAC} from "../../../../bll/packsReducer"
import DeleteIcon from '@mui/icons-material/Delete'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import FileOpenIcon from '@mui/icons-material/FileOpen'

export const Actions = (props: any) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const profileID = useAppSelector(state => state.profile.profile._id)

    const onBtnDeletePack = (packId: string, name?: string) => {
        dispatch(setPackNameIdAC(packId, name))
        dispatch(setAppOpenDiologsAC('openDeletePackDialogs'))
    }
    const onBtnUpdatePack = (packId: string, name?: string) => {
        dispatch(setPackNameIdAC(packId, name))
        dispatch(setAppOpenDiologsAC('openUpdatePackDialogs'))
    }
    const onBtnCardsClick = (packId: string) => dispatch(setPackNameIdAC(packId))

    return <Grid>
        <IconButton
            disabled={status === 'loadingDataGrid'}
            onClick={() => {onBtnCardsClick(props.cellValues.id)}}
            color="primary">
            <FileOpenIcon fontSize="small"/>
        </IconButton>
        
        {profileID === props.cellValues.row.userID && <IconButton
            disabled={status === 'loadingDataGrid'}
            onClick={() => {onBtnDeletePack(props.cellValues.id, props.cellValues.row.name)}}
            color="primary">
          <DeleteIcon fontSize="small"/>
        </IconButton>}
        
        {profileID === props.cellValues.row.userID && <IconButton
            disabled={status === 'loadingDataGrid'}
            onClick={() => {onBtnUpdatePack(props.cellValues.id, props.cellValues.row.name)}}
            color="primary">
          <BorderColorIcon fontSize="small"/>
        </IconButton>}
    </Grid>
}
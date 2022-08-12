import {useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Typography} from "@mui/material";
import {PATH} from "../Pages";
import {Navigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector, useIsFirstRender} from "../../../bll/hooks";
import {getCardTC} from '../../../bll/cardsReducer';
import {setAppOpenDiologsAC} from '../../../bll/appReducer';
import {CustomSearch} from './components/CustomSearch';
import {AddCardDialogs} from './components/AddCardDialogs';
import {CardsTable} from './components/CardsTable';
import {UpdateCardDialogs} from './components/UpdateCardDialogs';
import {DeleteCardDialogs} from './components/DeleteCardDialogs';

export const Card = () => {
    const dispatch = useAppDispatch()
    const firstRender = useIsFirstRender();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const search = useAppSelector(state => state.search)
    const profileID = useAppSelector(state => state.profile.profile._id)
    const packId = useAppSelector(state => state.packs.packId)

    const {cardsPack_id} = useParams()
    const cards = useAppSelector(state => state.card)


    useEffect(() => {
        dispatch(getCardTC(cardsPack_id as string))
    }, [search])

    const onBtnAddCard = () => dispatch(setAppOpenDiologsAC('openAddCardDiologs'))

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return <Grid sx={{height: 'auto', width: '100%', marginTop: '36px'}}>
        <Grid container
              justifyContent="space-between"
              alignItems="center"
              sx={{marginBottom: '40px'}}
        >
            <Typography variant="h4">
                Card list
            </Typography>
            <Button disabled={status === 'loading'}
                    variant="contained"
                    sx={{borderRadius: '30px'}}
                    onClick={onBtnAddCard}
            >Add new card</Button>
        </Grid>
        <Grid container
              direction="row"
              spacing={5}>
            <Grid>
                <CustomSearch/>
            </Grid>
        </Grid>
        <Grid sx={{marginTop: '24px'}}>
            <CardsTable/>
        </Grid>
        <AddCardDialogs/>
        <UpdateCardDialogs/>
        <DeleteCardDialogs/>
    </Grid>
}

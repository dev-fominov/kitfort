import {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Typography} from "@mui/material";
import {PATH} from "../Pages";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import {getPacksTC} from '../../../bll/packsReducer';
import {setAppOpenDiologsAC} from '../../../bll/appReducer';
import {Table} from './components/Table';
import {CustomToggleButton} from './components/CustomToggleButton';
import {CustomSlider} from './components/CastomSlider';
import {CustomSearch} from './components/CustomSearch';
import {DeletePackDialogs} from './components/DeletePackDialogs';
import {UpdatePackDialogs} from './components/UpdatePackDialogs';
import { AddPackDialogs } from './components/AddPackDialogs';


export const PacksList = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const search = useAppSelector(state => state.search)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [search])

    const onBtnAddPack = () => dispatch(setAppOpenDiologsAC('openAddPackDiologs'))

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
                Packs list
            </Typography>
            <Button disabled={status === 'loadingDataGrid'}
                    variant="contained"
                    sx={{borderRadius: '30px'}}
                    onClick={onBtnAddPack}
            >Add new pack</Button>
        </Grid>
        <Grid container
              direction="row"
              spacing={5}>
            <Grid item xs={6}>
                <CustomSearch/>
            </Grid>
            <Grid item xs={2}>
                <CustomToggleButton/>
            </Grid>
            <Grid item xs={4}>
                <CustomSlider/>
            </Grid>
        </Grid>
        <Grid sx={{marginTop: '24px'}}>
            <Table/>
        </Grid>
        <AddPackDialogs/>
        <UpdatePackDialogs/>
        <DeletePackDialogs/>
    </Grid>
}

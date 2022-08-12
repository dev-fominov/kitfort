import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {CustomizedDialogs} from '../../../common/CustomizedDialogs';
import {Grid} from '@mui/material';
import {deletePackTC} from '../../../../bll/packsReducer';
import {useAppDispatch, useAppSelector} from '../../../../bll/hooks';

export function DeletePackDialogs() {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const pack = useAppSelector(state => state.packs)

    return (
        <div>
            <CustomizedDialogs diologsName={'openDeletePackDialogs'} title={'Delete Pack'}>
                <Grid>
                    <Typography>
                        Do you really want to remove <b>{pack.packName}</b>?
                        All cards will be deleted.
                    </Typography>
                    <Button type={'submit'}
                            disabled={status === 'loading'}
                            variant={'contained'}
                            color={'error'}
                            onClick={() => dispatch(deletePackTC(pack.packId))}
                            fullWidth>Delete</Button>
                </Grid>
            </CustomizedDialogs>
        </div>
    );
}

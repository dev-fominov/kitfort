import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CustomizedDialogs } from '../../../common/CustomizedDialogs';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../bll/hooks';
import { deleteCardTC } from '../../../../bll/cardsReducer';


export function DeleteCardDialogs() {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const pack = useAppSelector(state => state.packs)
    const card = useAppSelector(state => state.cards.card)

    return (
        <div>
            <CustomizedDialogs diologsName={'openDeleteCardDialogs'} title={'Delete Card'}>
                <Grid>
                    <Typography>
                        Do you really want to remove <b>{card.question && card.question.length > 5
                            ? `${card.question.substring(0, 5)}...`
                            : card.question}</b>?
                    </Typography>
                    <Button type={'submit'}
                        disabled={status === 'loading'}
                        variant={'contained'}
                        color={'error'}
                        onClick={() => dispatch(deleteCardTC(pack.packId, card.card_id))}
                        fullWidth>Delete</Button>
                </Grid>
            </CustomizedDialogs>
        </div>
    );
}

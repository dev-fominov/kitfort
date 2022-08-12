import React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {CustomizedDialogs} from '../../../common/CustomizedDialogs';
import {Form, Formik, FormikErrors } from 'formik';
import {Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField } from '@mui/material';
import { addPackTC } from '../../../../bll/packsReducer';
import { useAppDispatch, useAppSelector } from '../../../../bll/hooks';
import { addCardTC } from '../../../../bll/cardsReducer';

interface FormValues {
    questionFormat: string
    question: string
    answer: string
}
export function AddCardDialogs() {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const packId = useAppSelector(state => state.packs.packId)
    return (
        <div>
            <CustomizedDialogs diologsName={'openAddCardDiologs'} title={'Add new card'}>
                <Grid>
                    <Formik
                        initialValues={{questionFormat: '', question: '', answer: ''}}
                        validate={values => {
                            const errors: FormikErrors<FormValues> = {};
                            if (!values.question) {
                                errors.question = 'Required';
                            } else  if (!values.answer) {
                                errors.answer = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, actions) => {
                            dispatch(addCardTC(packId, values.question, values.answer))
                            actions.setSubmitting(false)
                            actions.resetForm()
                        }}
                    >
                        {({values, getFieldProps, errors, touched}) => (
                            <Form>
                                <FormControl fullWidth>
                                    <FormGroup>
                                        <TextField error={touched.question && !!errors.question}
                                                   variant="standard"
                                                   label="Question"
                                                   placeholder={'Enter question'}
                                                   fullWidth
                                                   required
                                                   helperText={touched.question && errors.question ? errors.question : ''}
                                                   {...getFieldProps("question")} />
                                        <TextField error={touched.answer && !!errors.answer}
                                                   variant="standard"
                                                   label="Answer"
                                                   placeholder={'Enter answer'}
                                                   fullWidth
                                                   required
                                                   helperText={touched.answer && errors.answer ? errors.answer : ''}
                                                   {...getFieldProps("answer")} />
                                        <Button type={'submit'}
                                                disabled={status === 'loading'}
                                                variant={'contained'}
                                                color={'primary'}
                                                fullWidth>Save</Button>
                                    </FormGroup>
                                </FormControl>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </CustomizedDialogs>
        </div>
    );
}

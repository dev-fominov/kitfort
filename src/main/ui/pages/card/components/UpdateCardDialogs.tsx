import React from 'react';
import Button from '@mui/material/Button';
import {CustomizedDialogs} from '../../../common/CustomizedDialogs';
import {Form, Formik, FormikErrors} from 'formik';
import {FormControl, FormGroup, Grid, TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../../bll/hooks';
import {updateCardTC} from '../../../../bll/cardsReducer';

interface FormValues {
    question: string
    answer: string
}
export function UpdateCardDialogs() {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const packId = useAppSelector(state => state.packs.packId)
    const card = useAppSelector(state => state.card.card)
    
    return (
        <div>
            <CustomizedDialogs diologsName={'openUpdateCardDiologs'} title={'Edit card'}>
                <Grid>
                    <Formik
                        initialValues={{question: card.question, answer: card.answer}}
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
                            dispatch(updateCardTC(packId, card.card_id, values.question, values.answer))
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
                                                   //helperText={touched.question && errors.question ? errors.question : ''}
                                                   {...getFieldProps("question")} />
                                        <TextField error={touched.answer && !!errors.answer}
                                                   variant="standard"
                                                   label="Answer"
                                                   placeholder={'Enter answer'}
                                                   fullWidth
                                                   required
                                                //   helperText={touched.answer && errors.answer ? errors.answer : ''}
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

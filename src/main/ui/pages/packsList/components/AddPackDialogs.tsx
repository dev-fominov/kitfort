import React from 'react';
import Button from '@mui/material/Button';
import {CustomizedDialogs} from '../../../common/CustomizedDialogs';
import {Form, Formik, FormikErrors} from 'formik';
import {Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from '@mui/material';
import {addPackTC} from '../../../../bll/packsReducer';
import {useAppDispatch, useAppSelector} from '../../../../bll/hooks';

interface FormValues {
    title: string
    private: boolean
}

export function AddPackDialogs() {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    return (
        <div>
            <CustomizedDialogs diologsName={'openAddPackDiologs'} title={'Add new pack'}>
                <Grid>
                    <Formik
                        initialValues={{title: '', private: false}}
                        validate={values => {
                            const errors: FormikErrors<FormValues> = {};
                            if (!values.title) {
                                errors.title = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, actions) => {
                            dispatch(addPackTC(values.title, values.private))
                            actions.setSubmitting(false)
                            actions.resetForm()
                        }}
                    >
                        {({values, getFieldProps, errors, touched}) => (
                            <Form>
                                <FormControl fullWidth>
                                    <FormGroup>
                                        <TextField error={touched.title && !!errors.title}
                                                   variant="standard"
                                                   label="Pack name"
                                                   placeholder={'Enter name'}
                                                   fullWidth
                                                   required
                                                   helperText={touched.title && errors.title ? errors.title : ''}
                                                   {...getFieldProps("title")} />
                                        <FormControlLabel label={'Private pack'}
                                                          control={<Checkbox {...getFieldProps("private")}
                                                                             checked={values.private}/>}/>
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

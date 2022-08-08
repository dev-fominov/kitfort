import React from 'react';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {SearchOutlined} from '@mui/icons-material';
import Button from '@mui/material/Button';


const paperStyle = {padding: 30, height: '500px', width: "1000px", margin: '40px auto'}
const refStyle = {textDecoration: 'none', color: "inherit", fontSize: "25px", fontWeight: "700"}
const btStyle = {borderRadius: '30px', background: "#21268"}
const gridStyle = {marginTop: "30px"}
const emptyStyle = {marginTop: "150px", marginLeft:"150px", color: "#000", opacity: "0.5"}


export const AddNewCard = () => {
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <a href={"#"} style={refStyle}><KeyboardBackspaceIcon/><span>Pack Name</span></a>
                <Grid container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      style={gridStyle}
                >
                    <Grid xs={8}>
                        <TextField
                            fullWidth
                            id="standard-bare"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <SearchOutlined/>
                                    </IconButton>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <Button type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                style={btStyle}
                                fullWidth
                        >Add new card
                        </Button>
                    </Grid>
                </Grid>
                <p style={emptyStyle}>This pack is empty. Click add new card to fill this pack</p>
            </Paper>
        </Grid>
    );
};

import { ChangeEvent, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { InputBase, Slider, styled, Typography } from "@mui/material";
import { PATH } from "./Pages";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, useDebounce, useIsFirstRender } from "../../bll/hooks";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { setPageAC, setPageCountAC, setProfileIDAC, setSearchNameAC } from '../../bll/searchReducer';
import { addCardTC, deleteCardTC, getCardTC, updateCardTC } from '../../bll/cardsReducer';

const btStyle = { borderRadius: '30px' }

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: 'white',
    marginLeft: '0px',
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: 'auto',
    },
}));


export const Card = () => {
    const dispatch = useAppDispatch()
    const firstRender = useIsFirstRender();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const search = useAppSelector(state => state.search)
    const profileID = useAppSelector(state => state.profile.profile._id)

    const pack_id = window.location.hash.split('/').slice(-1)[0]
    const cards = useAppSelector(state => state.card)

    useEffect(() => {
        dispatch(getCardTC(pack_id))
    }, [search, pack_id])


    const handleChangeToggleButton = (event: React.MouseEvent<HTMLElement>, newAlignment: string,) => {
        if (newAlignment !== null) {
            dispatch(setProfileIDAC(newAlignment))
        }
    };

    const [valueSearch, setValueSearch] = useState('');
    const debouncedSearchTerm = useDebounce(valueSearch, 500);
    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.target.value)
    };
    useEffect(() => {
        if (!firstRender) {
            dispatch(setSearchNameAC(debouncedSearchTerm as string))
        }
    }, [debouncedSearchTerm])

    const columns: GridColDef[] = [
        {
            field: 'question',
            headerName: 'Question',
            flex: 4,
            minWidth: 150,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell'
        },
        {
            field: 'answer',
            headerName: 'Answer',
            flex: 1,
            minWidth: 100,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell'
        },
        {
            field: 'lastUpdated',
            type: 'date',
            headerName: 'Last Updated',
            flex: 2,
            minWidth: 100,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell'
        },
        {
            field: 'grade',
            type: 'rating',
            headerName: 'Created by',
            flex: 2,
            minWidth: 100,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell'
        },
        {
            field: 'userID',
            hide: true
        },
        {
            field: "Actions",
            sortable: false,
            flex: 1,
            minWidth: 100,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            renderCell: (cellValues: any) => {
                return <Grid>
                    {profileID === cellValues.row.userID &&
                        <IconButton
                            disabled={status === 'loading'}
                            onClick={(event) => {
                                onBtnDeleteCard(pack_id, cellValues.id)
                            }}
                            color="primary">
                            <DeleteIcon fontSize="small" />
                        </IconButton>}
                    {profileID === cellValues.row.userID &&
                        <IconButton
                            disabled={status === 'loading'}
                            onClick={(event) => {
                                onBtnUpdateCard(pack_id, cellValues.row.id, `Update question`, `Update answer`)
                            }}
                            color="primary">
                            <BorderColorIcon fontSize="small" />
                        </IconButton>}
                </Grid>
            }
        }
    ];

    const rows = cards.cards.map(card => (
        {
            id: card._id,
            answer: card.answer,
            question: card.question,
            lastUpdated: card.updated,
            grade: card.grade,
            userID: card.user_id
        }))


    const onBtnDeleteCard = (cardsPack_id: string, card_id: string) => { dispatch(deleteCardTC(cardsPack_id, card_id)) }
    const onBtnUpdateCard = (cardsPack_id: string, card_id: string, question?: string, answer?: string) => { dispatch(updateCardTC(cardsPack_id, card_id, question, answer)) }
    const onBtnAddCard = (cardsPack_id: string, question?: string, answer?: string) => dispatch(addCardTC(cardsPack_id, question, answer))

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN} />
    }

    return <Grid sx={{ height: 'auto', width: '100%', marginTop: '36px' }}>
        <Grid container
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: '40px' }}
        >
            <Typography variant="h4">
                Card list
            </Typography>
            <Button disabled={status === 'loading'}
                variant="contained"
                sx={btStyle}
                onClick={() => onBtnAddCard(pack_id, `new question`, `new answer`)}
            >Add new card</Button>

        </Grid>
        <Grid container
            direction="row"
            spacing={5}>
            <Grid item xs={6}>
                <Typography>
                    Search
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeSearch(e)}
                        value={valueSearch}
                        sx={{ '& .MuiInputBase-input css-yz9k0d-MuiInputBase-input': { width: '100%' } }}
                        placeholder="Search…"
                    />
                </Search>
            </Grid>
        </Grid>
        <Grid sx={{ marginTop: '24px' }}>
            <Box sx={{ height: 372, width: '100%' }}>
                <DataGrid
                    // onSortModelChange={handleSortModelChange}
                    // sortingMode="server"
                    loading={status === 'loading'}
                    rowCount={cards.cardsTotalCount}
                    paginationMode="server"
                    page={search.page}
                    onPageChange={(newPage: any) => dispatch(setPageAC(newPage))}
                    pageSize={search.pageCount}
                    onPageSizeChange={(newPage: any) => dispatch(setPageCountAC(newPage))}
                    autoHeight
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 15]}
                    checkboxSelection={false}
                    disableColumnMenu
                    disableSelectionOnClick
                    sx={{
                        '& .super-app-theme--header': { backgroundColor: 'rgba(86,164,31,0.12)' },
                        '& .super-app-theme--cell': { display: 'flex', justifyContent: 'center', },
                    }}
                />
            </Box>
        </Grid>
    </Grid>
}

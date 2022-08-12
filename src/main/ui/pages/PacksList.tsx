import { ChangeEvent, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { InputBase, Slider, styled, Typography } from "@mui/material";
import { PATH } from "./Pages";
import { Navigate, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector, useDebounce, useIsFirstRender } from "../../bll/hooks";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { addPackTC, deletePackTC, getPacksTC, setPackIdAC, updatePackTC } from '../../bll/packsReducer';
import { setMinMaxAC, setPageAC, setPageCountAC, setProfileIDAC, setSearchNameAC } from '../../bll/searchReducer';


const wrapperStyle = { height: '430px', width: '100%', marginTop: '36px' }
const btStyle = { borderRadius: '30px' }
const forgoPasswordTitleStyle = { textDecoration: 'none', color: 'black' }
const signUpTitleStyle = { textDecoration: 'none' }

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


export const PacksList = () => {
    const dispatch = useAppDispatch()
    const firstRender = useIsFirstRender();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const packs = useAppSelector(state => state.packs)
    const search = useAppSelector(state => state.search)
    const profileID = useAppSelector(state => state.profile.profile._id)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [search])


    const handleChangeToggleButton = (event: React.MouseEvent<HTMLElement>, newAlignment: string,) => {
        if (newAlignment !== null) {
            dispatch(setProfileIDAC(newAlignment))
        }
    };


    const [valueSlider, setValueSlider] = useState([0, 110]);
    const debouncedSliderTerm = useDebounce(valueSlider, 500);
    const handleChangeSlider = (event: Event, newValue: number | number[]) => {
        setValueSlider(newValue as number[])
    };
    useEffect(() => {
        if (!firstRender) {
            dispatch(setMinMaxAC(debouncedSliderTerm as number[]))
        }
    }, [debouncedSliderTerm])


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
            field: 'name',
            headerName: 'Name',
            flex: 4,
            minWidth: 150,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            renderCell: (cellValues: any) => {
                return <Grid>
                    <NavLink to={PATH.CARD + cellValues.id}>
                        {cellValues.value}
                    </NavLink>
                </Grid>
            }
        },
        {
            field: 'cards',
            headerName: 'Cards',
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
            field: 'createdBy',
            type: 'date',
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
                    <NavLink to={PATH.LEARN + cellValues.id}>
                        <IconButton
                            disabled={status === 'loading'}
                            color="primary">
                            <FileOpenIcon fontSize="small" />
                        </IconButton>
                    </NavLink>

                    {profileID === cellValues.row.userID &&
                        <IconButton
                            disabled={status === 'loading'}
                            onClick={(event) => {
                                onBtnDeletePack(cellValues.id as string)
                            }}
                            color="primary">
                            <DeleteIcon fontSize="small" />
                        </IconButton>}
                    {profileID === cellValues.row.userID &&
                        <IconButton
                            disabled={status === 'loading'}
                            onClick={(event) => {
                                onBtnUpdatePack(cellValues.id as string, 'Updat Name')
                            }}
                            color="primary">
                            <BorderColorIcon fontSize="small" />
                        </IconButton>}
                </Grid>
            }
        }
    ];

    const rows = packs.cardPacks.map(pack => (
        {
            id: pack._id,
            name: pack.name,
            cards: pack.cardsCount,
            lastUpdated: pack.updated,
            createdBy: pack.created,
            userID: pack.user_id
        }))


    const onBtnDeletePack = (packId: string) => { dispatch(deletePackTC(packId)) }
    const onBtnUpdatePack = (packId: string, name: string) => { dispatch(updatePackTC(packId, name)) }
    const onBtnCardsClick = (packId: string) => { dispatch(setPackIdAC(packId)) }
    const onBtnAddPack = (name: string) => dispatch(addPackTC(name))

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
                Packs list
            </Typography>
            <Button disabled={status === 'loading'}
                variant="contained"
                sx={btStyle}
                onClick={() => onBtnAddPack('new test pack')}
            >Add new pack</Button>

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
            <Grid item xs={2}>
                <Typography>
                    Show packs cards
                </Typography>
                <ToggleButtonGroup
                    fullWidth
                    value={search.profileID}
                    exclusive
                    onChange={handleChangeToggleButton}
                    color="primary"
                >
                    <ToggleButton value={profileID}>My</ToggleButton>
                    <ToggleButton value={''}>All</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={4}>
                <Typography>
                    Number of cards
                </Typography>
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Slider
                        value={valueSlider}
                        onChange={handleChangeSlider}
                        valueLabelDisplay="auto"
                    />
                </Grid>
            </Grid>
        </Grid>
        <Grid sx={{ marginTop: '24px' }}>
            <Box sx={{ height: 372, width: '100%' }}>
                <DataGrid
                    // onSortModelChange={handleSortModelChange}
                    // sortingMode="server"
                    loading={status === 'loading'}
                    rowCount={packs.cardPacksTotalCount}
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

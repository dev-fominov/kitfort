import {useNavigate} from "react-router-dom"
import {DataGrid, GridColDef, GridSortModel} from '@mui/x-data-grid'
import {Actions} from './Actions'
import {setPackNameIdAC} from '../../../../bll/packsReducer'
import {setPageAC, setPageCountAC, setSortProductsAC} from '../../../../bll/searchReducer'
import {useAppDispatch, useAppSelector} from '../../../../bll/hooks'
import {Box} from "@mui/material"

export const Table = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const status = useAppSelector(state => state.app.status)
    const packs = useAppSelector(state => state.packs)
    const search = useAppSelector(state => state.search)
    
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 4,
            minWidth: 150,
            headerAlign: 'center',
            cellClassName: 'super-app-theme--cell'
        },
        {
            field: 'cardsCount',
            headerName: 'Cards',
            flex: 1,
            minWidth: 100,
            headerAlign: 'center',
            cellClassName: 'super-app-theme--cell'
        },
        {
            field: 'updated',
            type: 'dateTime',
            valueGetter: ({value}) => value && new Date(value),
            headerName: 'Last Updated',
            flex: 2,
            minWidth: 100,
            headerAlign: 'center',
            cellClassName: 'super-app-theme--cell'
        },
        {
            field: 'created',
            type: 'dateTime',
            valueGetter: ({value}) => value && new Date(value),
            headerName: 'Created by',
            flex: 2,
            minWidth: 100,
            headerAlign: 'center',
            cellClassName: 'super-app-theme--cell'
        },
        {
            field: 'userID',
            hide: true
        },
        {
            field: "Actions",
            type: 'actions',
            sortable: false,
            flex: 1,
            minWidth: 100,
            headerAlign: 'center',
            cellClassName: 'super-app-theme--cell',
            renderCell: (cellValues) => <Actions cellValues={cellValues}/>
        }
    ]

    const rows = packs.cardPacks.map(pack => (
        {
            id: pack._id,
            name: pack.name,
            cardsCount: pack.cardsCount,
            updated: pack.updated,
            created: pack.created,
            userID: pack.user_id
        }))

    const handleRowClick = (param: any) => {
        dispatch(setPackNameIdAC(param.id))
        navigate(`cards/${param.id}`)
    };

    const handleSortModelChange = (sortModel: GridSortModel) => {
        dispatch(setSortProductsAC((sortModel[0].sort == "asc" ? 1 : 0) + sortModel[0].field))
    }

    return <Box sx={{height: 372, width: '100%'}}>
    <DataGrid
        sortingOrder={['desc', 'asc']}
        onSortModelChange={handleSortModelChange}
        sortingMode="server"
        loading={status === 'loadingDataGrid'}
        rowCount={packs.cardPacksTotalCount}
        paginationMode="server"
        page={search.page}
        onPageChange={newPage => dispatch(setPageAC(newPage))}
        pageSize={search.pageCount}
        onPageSizeChange={newPage => dispatch(setPageCountAC(newPage))}
        autoHeight
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 15]}
        onRowClick={handleRowClick}
        checkboxSelection={false}
        disableColumnMenu
        disableSelectionOnClick
        sx={{
            '& .MuiDataGrid-columnHeaders': {backgroundColor: "rgba(86,164,31,0.12)"},
            '& .super-app-theme--cell': {display: 'flex', justifyContent: 'center',},
        }}
    />
    </Box>
}

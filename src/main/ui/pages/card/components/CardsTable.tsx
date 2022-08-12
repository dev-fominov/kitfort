import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { setPageAC, setPageCountAC, setSortProductsAC } from '../../../../bll/searchReducer'
import { useAppDispatch, useAppSelector } from '../../../../bll/hooks'
import { Box, Rating } from "@mui/material"
import { ActionsCard } from "./ActionsCard"

export const CardsTable = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const search = useAppSelector(state => state.search)
    const cards = useAppSelector(state => state.cards)


    function renderRating(params: GridRenderCellParams<number>) {
        return <Rating readOnly value={params.value} />;
    }

    const columns: GridColDef[] = [
        {
            field: 'question',
            headerName: 'Question',
            flex: 4,
            minWidth: 150,
            headerAlign: 'center',
            cellClassName: 'super-app-theme--cell'
        },
        {
            field: 'answer',
            headerName: 'Answer',
            flex: 1,
            minWidth: 100,
            headerAlign: 'center',
            cellClassName: 'super-app-theme--cell'
        },
        {
            field: 'lastUpdated',
            type: 'dateTime',
            valueGetter: ({ value }) => value && new Date(value),
            headerName: 'Last Updated',
            flex: 2,
            minWidth: 100,
            headerAlign: 'center',
            cellClassName: 'super-app-theme--cell'
        },
        {
            field: 'grade',
            type: 'number',
            renderCell: renderRating,
            headerName: 'Grade',
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
            renderCell: (cellValues: any) => {
                return <ActionsCard cellValues={cellValues} />
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

    const handleSortModelChange = (sortModel: GridSortModel) => {
        dispatch(setSortProductsAC((sortModel[0].sort === "asc" ? 1 : 0) + sortModel[0].field))
    }

    return <Box sx={{ height: 372, width: '100%' }}>
        <DataGrid
            onSortModelChange={handleSortModelChange}
            sortingMode="server"
            loading={status === 'loadingDataGrid'}
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
                '& .MuiDataGrid-columnHeaders': { backgroundColor: "rgba(86,164,31,0.12)" },
                '& .super-app-theme--cell': { display: 'flex', justifyContent: 'center', },
            }}
        />
    </Box>
}

import React, { useState, memo } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'
import { UserCircle as UserCircleIcon } from '../icons/user-circle'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Done from '@mui/icons-material/Done';
import Pagination from "./CustomPagination";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Face6Icon from '@mui/icons-material/Face6';
const BasicTable = ({ data, column, title, onChange,
    checkBoxOption, onChangeCheckbox, action, search, mapping, showAvatar,
    showEdit, showDelete, showApprove, showDisprove, showReport, showPDF, showUpload ,showStudent}) => {
    const [rowsPerPage, setRowsPerPage] = useState(8)
    const [page, setPage] = useState(1)

    let rawData = data || []
    let checkBoxItems = checkBoxOption || []
    let finalColumn = column || []
    let finalTitle = title || 'Table'
    let showAction = action === false ? false : true
    let dataMapping = mapping || {}

    const getSearchData = (rowData) => {
        if (search && search.length > 1) {
            let validItems = []
            rowData.forEach(a1 => {
                let show = JSON.stringify(a1).toLowerCase().includes(search.toLowerCase()) ? true : false
                // let show = finalColumn.every((item, i) => {
                //     if (a1[item].toString().includes(search)) {
                //         return false
                //     }
                //     return true
                // })
                if (show) {
                    validItems.push(a1)
                }

            })

            return validItems
        } else {
            return rowData
        }

    }

    let finalData = getSearchData(rawData)


    function nameFormat(name) {
        let rawName
        if (typeof name === 'object') {
            rawName = name['header']
        } else {
            rawName = name
        }
        let noSpName = rawName.replace(/[^a-zA-Z ]/g, " ")
        return noSpName[0].toUpperCase() + noSpName.slice(1).toLowerCase();
    }



    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const onCheckboxClick = (e, rowData, type) => {
        if (onChangeCheckbox && typeof onChangeCheckbox === "function") {
            onChangeCheckbox({ ...rowData, checked: e.target.checked, selectedField: type })
        }
    }



    const checkBoxColumn = (row) => {
        let itemList = [];
        checkBoxItems.forEach((item, index) => {
            itemList.push(
                <TableCell style={{ width: '2%' }} key={index + item + 'column'}>
                    <Checkbox
                        label={item}
                        defaultChecked={(row[item] === true || row[item] === 1) ? true : false}
                        onChange={(e) => onCheckboxClick(e, row, item)}
                    />
                </TableCell>
            )
        })

        return itemList

    };

    const checkBoxHeader = () => {
        let itemList = [];
        checkBoxItems.forEach((item, index) => {
            itemList.push(<TableCell style={{ width: '2%' }} key={index + item}>{item}</TableCell>)
        })

        return itemList
    }

    const openDialog = (e, rowData) => {
        if (onChange && typeof onChange === "function") {
            onChange(true, e, rowData);
        }
    }

    const renderAction = (type, row) => {
        if (showAction) {
            if (type === 'header') {
                return (
                    <TableCell>Action</TableCell>
                )
            } else {
                return (
                    <TableCell>

                        {showApprove && <IconButton onClick={() => { openDialog('Approve', row) }}>
                            <Done />
                        </IconButton>}
                        {showDisprove && <IconButton onClick={() => { openDialog('Disprove', row) }}>
                            <DangerousIcon />
                        </IconButton>}
                        {/* <Tooltip title="Delete"> */}
                        {showDelete && <IconButton onClick={() => { openDialog('Delete', row) }}>
                            <DeleteIcon />
                        </IconButton>}
                        {showEdit && <IconButton onClick={() => { openDialog('Edit', row) }}>
                            <EditIcon />
                        </IconButton>}
                        {showReport && <IconButton onClick={() => { openDialog('Report', row) }}>
                            <AssessmentIcon />
                        </IconButton>}
                        {showPDF && <IconButton onClick={() => { openDialog('PDF', row) }}>
                            <PictureAsPdfIcon />
                        </IconButton>}
                        {showUpload && <IconButton onClick={() => { openDialog('Upload', row) }}>
                            <FileUploadIcon />
                        </IconButton>}
                        {showStudent && <IconButton onClick={() => { openDialog('Student', row) }}>
                            <Face6Icon />
                        </IconButton>}
                  
                        {/* </Tooltip> */}
                    </TableCell>
                )
            }
        } else {
            return
        }
    }

    const renderAvatar = (type, image) => {
        if (showAvatar) {
            // conso
            if (type === 'header') {
                return (
                    <TableCell padding="checkbox"></TableCell>
                )
            } else {
                console.log(image)
                return (
                    <TableCell padding="checkbox">
                        <Avatar
                            sx={{
                                height: 35,
                                width: 35,
                                ml: 1
                            }}
                            src={image}
                        >
                            <UserCircleIcon fontSize="small" />
                        </Avatar>
                    </TableCell>
                )
            }
        } else {
            return
        }
    }

    const renderColumn = (row, i) => {

        return (
            <TableRow
                key={i + 'column'}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                {renderAvatar("", row.image)}
                {finalColumn.map((item, i) => { return <TableCell key={item + 'child column'} >{renderColumValue(row, item)}</TableCell> }
                )}
                {renderAction('column', row)}
                {checkBoxColumn(row)}
            </TableRow>
        )
    }

    const renderColumValue = (row, items) => {
        if (typeof items === 'object') {
            return (
                <List
                    dense={true} disablePadding={true}>
                    {row[items.header].map((item, i) => (
                        <ListItem dense={true} disableGutters={true} disablePadding={true}
                            key={i + 'column value'}>{items.value ? handleMapping(items, item[items.value]) : handleMapping(items, item)}</ListItem>
                    ))}
                </List>
            )
        } else {
            return handleMapping(items, row[items]);
        }
    }



    const handleMapping = (field, value) => {
        if (dataMapping[field]) {
            return dataMapping[field].get(value.toString()) || value
        } else {
            return value
        }

    };

    const renderCollapseTable = (row, i) => {
        return (
            <TableRow
                key={i + 'column'}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                {finalColumn.map((item) => { return <TableCell key={item + 'child column'}>{row[item]}</TableCell> }
                )}
                {renderAction('column', row)}
                {checkBoxColumn(row)}
            </TableRow>
        )
    }

    return (
        <Paper sx={{ width: '100%' }}>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label={finalTitle}>
                    <TableHead>
                        <TableRow>
                            {renderAvatar('header')}
                            {finalColumn.map((header, i) =>
                                <TableCell key={header}  >{nameFormat(header)}</TableCell>
                            )}
                            {renderAction('header')}
                            {checkBoxHeader()}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {finalData.slice((page - 1) * rowsPerPage, ((page - 1) * rowsPerPage) + rowsPerPage).map((row, i) => (
                            renderColumn(row, i)
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                className="pagination-bar"
                currentPage={page}
                totalCount={finalData.length}
                pageSize={rowsPerPage}
                onPageChange={page => setPage(page)}
            />

        </Paper>

    )

}

const MemoTable = memo(BasicTable)

export default MemoTable;
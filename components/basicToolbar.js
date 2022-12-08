import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography,
    Paper,

} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';


const TableToolbar = ({ title, children, onChange, onChangeSearch,
    showAction, showExport, showImport, icon, showUpdate, showAdd }, props) => {

    const SearchPlaceholder = `Search ${title || ''}`

    const openDialog = (e) => {
        if (onChange && typeof onChange === "function") {
            onChange(true, e);
        }
    }

    const handleChange = (e) => {
        let search = e.target.value
        if (onChangeSearch && typeof onChangeSearch === "function") {
            onChangeSearch(search)
        }
    };

    return (
        <Box {...props}>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    // m: -1
                }}
            >
                <Paper elevation={0} square style={styles.root}>
                    <div style={styles.pageHeader}>
                        <Card style={styles.pageIcon}>
                            {icon || <DataThresholdingIcon fontSize='large' />}
                        </Card>
                        <div style={styles.pageTitle}>
                            <Typography
                                variant="h2"
                                component="div">
                                {title}</Typography>

                        </div>
                    </div>
                </Paper>

                <Box sx={{ m: 1 }}>
                    {showImport && <Button
                        startIcon={(<UploadIcon fontSize="small" />)}
                        sx={{ mr: 1 }}
                        onClick={() => { openDialog('Import') }}
                    >
                        Import
                    </Button>}
                    {showExport && <Button
                        startIcon={(<DownloadIcon fontSize="small" />)}
                        sx={{ mr: 1 }}
                        onClick={() => { openDialog('Export') }}
                    >
                        Export
                    </Button>}
                    {showAdd && <Button
                        color="primary"
                        variant="contained"
                        onClick={() => { openDialog('Add') }}
                    // onClick={() => { setOpenPopup(true); setRecordForAdd(null); }}
                    >
                        Add {title}
                    </Button>}
                    {showUpdate && <Button
                        color="primary"
                        variant="contained"
                        onClick={() => { openDialog('Update') }}
                    // onClick={() => { setOpenPopup(true); setRecordForAdd(null); }}
                    >
                        Update {title}
                    </Button>}
                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Box sx={{ maxWidth: 500 }}>
                            <TextField
                                fullWidth
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon
                                                color="action"
                                                fontSize="small"
                                            >
                                                <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                                placeholder={SearchPlaceholder}
                                variant="outlined"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>

        </Box>

    )
};

export default TableToolbar
const styles = {
    root: {
        backgroundColor: '#F9FAFC'
    },
    pageHeader: {
        // padding: theme.spacing(4),
        padding: 24,
        display: 'flex',
        // marginBottom: theme.spacing(2),
        backgroundColor: '#F9FAFC'

    },
    pageIcon: {
        display: 'inline-block',
        padding: 16,
        // padding: theme.spacing(2),
        color: '#3c44b1'
    },
    pageTitle: {
        paddingLeft: 24,
        // paddingLeft: theme.spacing(4),
        // '& .MuiTypography-subtitle2': {
        //     opacity: '0.6'
        // }
    }
};

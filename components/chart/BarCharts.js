import { Bar } from 'react-chartjs-2'
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material'

export const BarChart = (props) => {
    const theme = useTheme();
    const { title, datasets } = props

    const data = {
        datasets: [
            {
                backgroundColor: '#3F51B5',
                barPercentage: 0.5,
                barThickness: 12,
                borderRadius: 4,
                categoryPercentage: 0.5,
                data: datasets.first,
                label: 'Profit',
                maxBarThickness: 10
            },
            {
                backgroundColor: '#FFFF00',
                barPercentage: 0.5,
                barThickness: 12,
                borderRadius: 4,
                categoryPercentage: 0.5,
                data:datasets.second,
                label: 'Booking number',
                maxBarThickness: 10
            }
        ],
        labels: datasets.label
    };

    const options = {
        animation: false,
        cornerRadius: 20,
        layout: { padding: 0 },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        xAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary
                },
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary,
                    beginAtZero: true,
                    min: 0
                },
                gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: theme.palette.divider,
                    drawBorder: false,
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                    zeroLineColor: theme.palette.divider
                }
            }
        ],
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    return (
        <Card {...props}>
            <CardHeader
                title={title}
            />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 150,
                        position: 'relative'
                    }}
                >
                    <Bar
                        width={'100%'}
                        height={'100%'}
                        data={data}
                        options={options}
                    />
                </Box>
            </CardContent>
            <Divider />
        </Card>
    );
};

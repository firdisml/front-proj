import { Line } from 'react-chartjs-2'
import { Box, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material'


export const LineCharts = (props) => {
    const theme = useTheme();
    const { title, datasets } = props
    console.log(datasets)
    const data = {
        labels: datasets.label,
        datasets: [
            {
                label: "First dataset",
                data: datasets.first,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Booking Number",
                data: datasets.second,
                fill: false,
                borderColor: "#742774"
            }
        ]
    };

    const options = {
        plugins: {
            zoom: {
                zoom: {
                    enabled: true,


                    wheel: {
                        enabled: true // SET SCROOL ZOOM TO TRUE
                    },
                    drag: {
                        enabled: true,

                    },
                    mode: "x",
                    speed: 100,
                    onZoomComplete: ({ chart }) => {
                        console.log(chart.scales.x.ticks)
                    },
                },



            }
        },


    }

    return (
        <Card {...props}>
            <CardHeader
                sx={{
                    height: 10,
                    // width: '100%',
                    position: 'relative'
                }}
                title="Overall Report"
            />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 150,
                        // width: '100%',
                        position: 'relative'
                    }}
                >
                    <Line
                        options={options}
                        width={'100%'}
                        height={'30%'}
                        data={data} />
                </Box>
            </CardContent>
            <Divider />
        </Card>
    );
};

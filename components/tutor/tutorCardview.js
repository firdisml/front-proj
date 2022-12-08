import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard(props) {
    const { name, description, image, onClickBook ,id,level} = props

    const openDialog = (e) => {
        if (onClickBook && typeof onClickBook === "function") {
            onClickBook(e,id);
        }
    }
    return (
        <Card sx={{ maxWidth: 280}}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="180"
                image={image||'/static/images/avatars/default_profile.png'}
            />
            <CardContent sx={{
                paddingTop:1,
                paddingBottom:1
            }}>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {name}
                </Typography>
                <Typography sx={{height:15}}variant="subtitle2" color="text.secondary">
                    {level}
                </Typography>
                
                {/* <Typography sx={{height:50}}variant="body2" color="text.secondary">
                    {description}
                </Typography> */}
            </CardContent>
            <CardActions disableSpacing={true}>
                {/* <Button size="small">Share</Button> */}
                <Button onClick={() => { openDialog('BOOK') }} size="small">BOOK</Button>

                <Button onClick={() => { openDialog('RATE') }} size="small">VIEW</Button>
            </CardActions>
        </Card>
    );
}
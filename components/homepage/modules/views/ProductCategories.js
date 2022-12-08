import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));


const images = [
  {
    url: 'https://thumbs.dreamstime.com/b/malay-language-culture-concept-book-wooden-background-malay-language-culture-concept-117669144.jpg',
    title: 'Malay',
    width: '40%',
  },
  {
    url: 'https://images2.alphacoders.com/659/thumb-1920-659390.jpg',
    title: 'History',
    width: '20%',
  },
  {
    url: 'https://i.pinimg.com/originals/65/c0/4d/65c04dda9c4f4a57acd6b08fa267af54.jpg',
    title: 'English',
    width: '40%',
  },
  {
    url: 'https://cdn.wallpapersafari.com/26/91/Mwr5Y6.jpg',
    title: 'Science',
    width: '38%',
  },
  {
    url: 'https://images.unsplash.com/photo-1604351888999-9ea0a2851e61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2VvZ3JhcGh5fGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    title: 'Geography',
    width: '38%',
  },
  {
    url: 'https://static.scientificamerican.com/blogs/cache/file/15E43A6F-3941-471A-BF4A81AECDC8C8AA_source.jpg?w=590&h=800&19535223-FF51-4AE3-A05064AFC6E375F5',
    title: 'Mathematics',
    width: '24%',
  },
  {
    url: 'https://miro.medium.com/max/590/1*uRHonpgf6FtDoIf2DG-feQ.jpeg',
    title: 'Moral',
    width: '50%',
  },
  // {
  //   url: 'https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&w=400',
  //   title: 'Fitness',
  //   width: '20%',
  // },
  {
    url: 'https://media.istockphoto.com/id/1320882544/photo/glowing-light-bulb-and-book-or-text-book-with-futuristic-icon-self-learning-or-education.jpg?b=1&s=170667a&w=0&k=20&c=Ujv8_0TPyMaLFUzf_4b3klbuiUW3KQ2VdFrSGatFGXA=',
    title: 'Other',
    width: '50%',
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all subject
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}

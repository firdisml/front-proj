import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material'

const user = {
  avatar: '/static/images/avatars/avatar_1.png',
  city: 'Kuala Lumpur',
  country: 'Malaysia',
  jobTitle: 'Senior Developer',
  name: 'Zhou Tzuyu',
  timezone: 'GTM-8'
};

export const AccountProfile = (props) => {

  const { setSelectedImage, setResume } = props
  const type = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''
  const handleSubmit = (event) => {
    if (setSelectedImage && typeof setSelectedImage === "function") {
      setSelectedImage(event.target.files[0])
    }

  }

  const handleSubmitResume = (event) => {
    if (setResume && typeof setResume === "function") {
      setResume(event.target.files[0])
    }

  }

  return (

    <Card >
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={props.image || "/static/images/avatars/default_profile.png"}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {props.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {props.age}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {props.address}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          component="label"
          // accept="image/*" multiple type="file"
          color="primary"
          fullWidth
          variant="text"
        >
          <input hidden accept="image/*" type="file"
            onChange={handleSubmit} />
          Upload picture
        </Button>

        {type === 'Tutor' && <Button
          component="label"
          // accept="image/*" multiple type="file"
          color="primary"
          fullWidth
          variant="text"
        >
          <input hidden type="file" accept="application/pdf"
            onChange={handleSubmitResume} />
          Upload Resume
        </Button>}
      </CardActions>
    </Card>
  )
}

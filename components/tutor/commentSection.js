import React, { useState, useEffect } from 'react'
import { Divider, Avatar, Grid, Paper, TextField, Button ,Box} from "@mui/material";
import Rating from '@mui/material/Rating';


const CommentSection = ({ data, getComment, userImage }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const submit = () => {
        if (!comment) {
            return
        }
        if (getComment && typeof getComment === "function") {
            setComment('')
            getComment(comment, rating);
        }
    }


    return (
        <div style={{ padding: 14 }} className="App">
            <h3>Comments:</h3>

            <Paper style={{ padding: "5px 20px", marginTop: 4 }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>Rating</h4>
                        <Box style={{ textAlign: "left" }}>
                            <Rating name="read-only" value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }} />
                        </Box>
                        <h4 style={{ margin: 0, textAlign: "left" }}>Comment:</h4>
                        <Box style={{ textAlign: "left" }}>
                            <TextField
                                fullWidth
                                id="standard-multiline-flexible"
                                label="Comments"
                                name="comments"
                                multiline
                                rows={2}
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                variant="outlined"
                            />
                        </Box>
                        <Box style={{ textAlign: "right", marginTop: 8 }}>
                            <Button
                                onClick={() => { submit() }}
                                color="primary"
                                variant="contained"
                            // type="submit"
                            >
                                Submit
                            </Button>
                        </Box>
                        {/* <p style={{ textAlign: "left", color: "gray" }}>
                                posted {a1.time}
                            </p> */}
                    </Grid>
                </Grid>
            </Paper>
            {data.map((a1,i) =>
                <Paper style={{ padding: "25px 20px", marginTop: 10 }} key={i+'comment'}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar alt="Remy Sharp" src={a1.image} />

                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: "left" }}>{a1.username}</h4>
                            <Rating name="read-only" value={a1.rating || 0} readOnly />
                            <Box style={{ textAlign: "left" }}>
                                {a1.message}{" "}
                            </Box>
                            <Box style={{ textAlign: "left", color: "gray" }}>
                                posted {a1.time}
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </div>
    );
}

export default CommentSection;

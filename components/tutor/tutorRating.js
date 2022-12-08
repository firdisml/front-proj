import React, { useEffect, useState, useRef } from 'react'
import { ClassCard } from '../class/classCard';
import { getClass } from '../../actions/subjectActions'
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommentSection from './commentSection';
import { TutorProfile } from './tutorProfile';
import { getUserData } from '../../actions/userActions';
import { getComments, addComment, getRating } from '../../actions/commentActions';

export default function TutorRating(props) {
    const dispatch = useDispatch();
    const { id, onClickAdd, back } = props

    const userData = useSelector(state => state.userData);
    const { data } = userData

    const comments = useSelector(state => state.comments);
    const { data: cData } = comments

    const commentUpdate = useSelector(state => state.commentUpdate);
    const { status } = commentUpdate


    const userId = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('id')) : ''


    const openDialog = (a1) => {
        if (onClickAdd && typeof onClickAdd === "function") {
            onClickAdd(a1);
        }
    }


    useEffect(() => {
        dispatch(getUserData(id))
        return () => {
        };
    }, []);

    useEffect(() => {
        dispatch(getComments(id))
        return () => {
        };
    }, [status]);



    const onClickBack = () => {
        if (back && typeof back === "function") {
            back();
        }
    }

    const onClickAddComment = (comment,rating) => {
        dispatch(addComment(id, userId, comment,rating))
    }

    console.log(data)

    return (
        <>
            <IconButton onClick={() => { onClickBack() }} sx={{ mb: 2 }} color="primary" aria-label="upload picture" component="label">
                {/* <input hidden accept="image/*" type="file" /> */}
                <ArrowBackIcon />
            </IconButton>
            <TutorProfile values={data} />
            <CommentSection data={cData} getComment={(e,r) => onClickAddComment(e,r)} />

        </>

    );
}
import React, { useEffect, useState, useRef } from 'react'
import { ClassCard } from '../class/classCard';
import { getClass } from '../../actions/subjectActions'
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommentSection from './commentSection';

export default function SelectedTutor(props) {
    const dispatch = useDispatch();
    const { id, onClickAdd, back } = props

    const classes = useSelector(state => state.classes);
    const { data } = classes
    
    const bookingUpdate = useSelector(state => state.bookingUpdate);
    const { status } = bookingUpdate
    

    function getFilterData(data){
        let filteredData=[]
        data.forEach(a1=>{
            if(a1.status==='booked'){

            }else{
                filteredData.push(a1)
            }
        })

        return filteredData

    }

    const getImg = (subject) => {

        switch (subject) {
            case 'Malay':
                return '/static/images/subject/bm.jpg'
            case 'English':
                return '/static/images/subject/eng.jpg'
            case 'History':
                return '/static/images/subject/history.jpg'
            case 'Science':
                return '/static/images/subject/science.jpg'
            case 'Geography':
                return '/static/images/subject/geo.jpg'
            case 'Mathematics':
                return '/static/images/subject/math.jpg'
            case 'Moral':
                return '/static/images/subject/moral.jpg'

        }

    }

    const openDialog = (a1) => {
        if (onClickAdd && typeof onClickAdd === "function") {
            onClickAdd(a1);
        }
    }


    useEffect(() => {
        dispatch(getClass(id))
        return () => {
        };
    }, [status]);

    const onClickBack = () => {
        if (back && typeof back === "function") {
            back();
        }
    }


    return (
        <>
            <IconButton onClick={() => { onClickBack() }} sx={{ mb: 2 }} color="primary" aria-label="upload picture" component="label">
                {/* <input hidden accept="image/*" type="file" /> */}
                <ArrowBackIcon />
            </IconButton>
            {getFilterData(data).map((a1, i) =>


                <ClassCard
                    key={i + 'tutor'}
                    onClickBook={() => openDialog(a1)}
                    item_id={a1.item_id}
                    image={getImg(a1.subject)}
                    subject={a1.subject}
                    level={a1.education_level}
                    price={a1.price}
                    time={a1.time}
                    days={a1.days}

                />


            )}


        </>

    );
}
import React from 'react'
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa'



const ReviewRatingStars = ({rating}) => {
    const stars = []

    for (let i = 1; i <= 5; i++) {
        if(i <= rating) {
            stars.push(<FaStar key={i} className='text-yellow-500' />)
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<FaStarHalfAlt key={i} className='text-yellow-500' />)
        } else {
            stars.push(<FaRegStar key={i} className='text-yellow-500' />)
        }        
    }

    return (
        <div className='flex justify-center'>
            {stars}
        </div>
    )
}

export default ReviewRatingStars
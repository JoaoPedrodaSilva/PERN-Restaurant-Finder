import React from 'react'
import ReviewRatingStars from './ReviewRatingStars'

const ReviewRestaurantHeader = ({restaurant}) => {
  return (
    <header className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl'>Review Page</h1>
        <h4 className='text-xl'>{restaurant.name} - {restaurant.location}</h4>
        <div>
            <ReviewRatingStars rating={restaurant.average_rating} />
            <span>
                {
                    restaurant.total_ratings ?
                    `(${restaurant.total_ratings} reviews)` :
                    '(0 reviews)'
                }
            </span>
        </div>
    </header>
  )
}

export default ReviewRestaurantHeader
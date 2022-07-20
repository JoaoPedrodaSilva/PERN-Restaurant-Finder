import React from 'react'
import { useParams } from 'react-router-dom'
import axios from '../axios'
import ReviewRatingStars from './ReviewRatingStars'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useGlobalContext } from '../globalContext'

const ReviewCards = ({ reviews }) => {
  const { id } = useParams()
  const { reviewIndex, setReviewIndex } = useGlobalContext()

  
  const handleDeleteReview = async (id, reviewId) => {
    try {
      await axios.delete(`/${id}/reviews/${reviewId}`)
      window.location.reload(true);
    } catch (error) {
      console.log(error)
    }
  }
  const prevReview = () => {
    setReviewIndex(index => {
      if (index === 0) {
        return reviews.length - 1
      } else {
        return index - 1
      }
    })
  }
  const nextReview = () => {
    setReviewIndex(index => {
      if (index === reviews.length - 1) {
        return 0
      } else {
        return index + 1
      }
    })
  }

  return (
    <>
      {reviews.length > 0 && (
        <article className='w-3/4 flex gap-5 items-center justify-center mt-5'>
          <FaChevronLeft
            className='text-xl text-blue-400 hover:text-blue-600'
            onClick={() => prevReview()}
          />
          <div className="w-full flex flex-col items-center justify-center gap-5 h-48 pb-1 m-1 border rounded shadow bg-blue-100" key={reviews[reviewIndex].id}>
            <button
              className='self-end bg-red-300 hover:bg-red-500 text-white text-xs border rounded p-1'
              onClick={() => handleDeleteReview(id, reviews[reviewIndex].id)}
            >
              DELETE REVIEW
            </button>
            <h2 className='text-lg font-bold break-words'>{reviews[reviewIndex].name}</h2>
            <p className='text-sm break-words text-center px-5 h-8 mb-5'>{reviews[reviewIndex].review}</p>
            <ReviewRatingStars rating={reviews[reviewIndex].rating} />
          </div>
          <FaChevronRight
            className='text-xl text-blue-400 hover:text-blue-600'
            onClick={() => nextReview()}
          />
        </article>
      )}
    </>
  )
}

export default ReviewCards
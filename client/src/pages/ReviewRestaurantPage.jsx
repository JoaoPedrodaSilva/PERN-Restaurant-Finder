import React, {useEffect} from 'react'
import ReviewRestaurantForm from '../components/ReviewRestaurantForm'
import ReviewCards from '../components/ReviewCards'
import axios from '../apis/axios'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../globalContext'
import ReviewRestaurantHeader from '../components/ReviewRestaurantHeader'

const ReviewRestaurantPage = () => {
  const {id} = useParams()
  const {selectedRestaurant, setSelectedRestaurant} = useGlobalContext()

  useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/${id}`)
                setSelectedRestaurant(response.data)
            } catch (error) {
                console.log(error)
            }            
        }
        fetchData()
    }, [])

  //rendering component
  return (
    <>
      {selectedRestaurant && (
        <section className='flex flex-col items-center select-none'>
          <ReviewRestaurantHeader restaurant={selectedRestaurant.restaurant} />
          <ReviewCards reviews={selectedRestaurant.reviews} />
          <ReviewRestaurantForm reviews={selectedRestaurant.reviews} />
        </section>
      )}
    </>
  )
}

export default ReviewRestaurantPage
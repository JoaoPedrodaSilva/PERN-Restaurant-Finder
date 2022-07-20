import React from 'react'
import UpdateRestaurantForm from '../components/UpdateRestaurantForm'

const UpdateRestaurantPage = () => {
  return (
      <section className='flex flex-col items-center'>
          <h1 className='text-3xl'>Update Page</h1>
          <UpdateRestaurantForm />
      </section>
  )
}

export default UpdateRestaurantPage
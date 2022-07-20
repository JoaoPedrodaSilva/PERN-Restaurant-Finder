import React from 'react'
import AddRestaurantForm from '../components/AddRestaurantForm'
import RestaurantList from '../components/RestaurantList'

const HomePage = () => {
  return (
    <main className='flex flex-col items-center h-4/5 '>
        <h1 className='text-3xl'>Restaurants List</h1>
        <AddRestaurantForm />
        <RestaurantList />
    </main>
  )
}

export default HomePage
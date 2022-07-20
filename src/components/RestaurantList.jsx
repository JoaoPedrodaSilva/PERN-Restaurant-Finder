import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../axios'
import { useGlobalContext } from '../globalContext'
import ReviewRatingStars from './ReviewRatingStars'

const RestaurantList = () => {
    const { allRestaurants, setAllRestaurants } = useGlobalContext()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/')
                setAllRestaurants(response.data.restaurants)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const handleDelete = async id => {
        try {
            
            await axios.delete(`/${id}`)
            setAllRestaurants(allRestaurants.filter(restaurant => restaurant.id !== id))

        } catch (error) {
            console.log(error)
        }
    }

    const renderRating = restaurant => {
        if (!restaurant.total_ratings) {
            return <span>None</span>
        } else {
            return (
                <>
                    <ReviewRatingStars rating={restaurant.average_rating} />
                    <span className='text-yellow-500'>({restaurant.total_ratings})</span>
                </>
            )
        }
    }

    //rendering component
    return (
        <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
            <table className="w-full border-collapse border border-slate-400 text-xs text-center">
                <thead className='bg-blue-500 text-white break-words sticky top-0'>
                    <tr className='h-8'>
                        <th className="border border-slate-300">Restaurant</th>
                        <th className="border border-slate-300">Location</th>
                        <th className="border border-slate-300">Price Range</th>
                        <th className="border border-slate-300">Ratings</th>
                        <th className="border border-slate-300">Review</th>
                        <th className="border border-slate-300">Edit</th>
                        <th className="border border-slate-300">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {allRestaurants && allRestaurants.map(restaurant => {
                        return (
                            <tr key={restaurant.id} className='hover:bg-blue-100 h-12'>
                                <td className="border border-slate-300 break-all">{restaurant.name}</td>
                                <td className="border border-slate-300 break-all">{restaurant.location}</td>
                                <td className="border border-slate-300 break-all">{'$'.repeat(restaurant.price_range)}</td>
                                <td className="border border-slate-300 break-all">{renderRating(restaurant)}</td>
                                <td className="border border-slate-300">
                                    <Link to={`/restaurants/${restaurant.id}`}>
                                        <button className="rounded col-span-2 
                                                bg-blue-500 hover:bg-blue-600 text-white font-bold
                                                p-1              
                                                focus:outline-none focus:shadow-outline"
                                        >
                                            Review
                                        </button>
                                    </Link>
                                </td>
                                <td className="border border-slate-300 ...">
                                    <Link to={`/restaurants/${restaurant.id}/update`}>
                                        <button className="rounded col-span-2 
                                                bg-yellow-500 hover:bg-yellow-600 text-white font-bold
                                                p-1            
                                                focus:outline-none focus:shadow-outline">
                                            Update
                                        </button>
                                    </Link>
                                </td>
                                <td className="border border-slate-300 ...">
                                    <button
                                        className="rounded col-span-2 
                                                bg-red-500 hover:bg-red-700 text-white font-bold
                                                p-1              
                                                focus:outline-none focus:shadow-outline"
                                        onClick={() => handleDelete(restaurant.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList

import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGlobalContext } from '../globalContext'
import axios from '../apis/axios'


const UpdateRestaurantForm = () => {
    const { id } = useParams()
    const {
        restaurantName, setRestaurantName,
        restaurantLocation, setRestaurantLocation,
        restaurantPriceRange, setRestaurantPriceRange,
    } = useGlobalContext()

    // Need to fetch the data inside this component.
    // Otherwise, if the user copy and paste the URL
    // in other tab, the browser won't be able to find the data.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/${id}`)
                setRestaurantName(response.data.restaurant.name)
                setRestaurantLocation(response.data.restaurant.location)
                setRestaurantPriceRange(response.data.restaurant.price_range)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const handleUpdate = async event => {
        event.preventDefault()
        try {
            await axios.put(`/${id}`, {
                name: restaurantName,
                location: restaurantLocation,
                price_range: restaurantPriceRange
            })
        } catch (error) {
            console.log(error)
        }
    }

    //rendering component
    return (
        <form className="w-full flex flex-col gap-8 rounded py-6 mt-6 text-sm">
            <div className='w-full'>
                <label className="block text-gray-700 font-bold mb-2" htmlFor="restaurantName">
                    Restaurant name:
                </label>
                <input
                    className="appearance-none shadow w-full                                              
                            border border-gray-400 hover:border-blue-400 rounded
                            px-1 py-2 
                            text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline"
                    id='restaurantName'
                    type="text"
                    placeholder="Restaurant name"
                    maxLength={15}
                    value={restaurantName}
                    onChange={event => setRestaurantName(event.target.value)}
                />
            </div>

            <div>
                <label className="block text-gray-700 font-bold mb-2" htmlFor="restaurantLocation">
                    Location:
                </label>
                <input
                    className="appearance-none shadow w-full                                           
                            border border-gray-400 hover:border-blue-400 rounded
                            px-1 py-2 
                            text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline"
                    id='restaurantLocation'
                    type="text"
                    placeholder="Location"
                    maxLength={15}
                    value={restaurantLocation}
                    onChange={event => setRestaurantLocation(event.target.value)}
                />
            </div>

            <div>
                <label className="block text-gray-700 font-bold mb-2" htmlFor="restaurantPriceRange">
                    Price Range:
                </label>      
                <select
                    className="appearance-none shadow w-full
                        border border-gray-400 hover:border-blue-400 rounded
                        px-1 py-2 
                        text-gray-700 leading-tight
                        focus:outline-none focus:shadow-outline"
                    id='restaurantPriceRange'
                    value={restaurantPriceRange}
                    onChange={event => setRestaurantPriceRange(event.target.value)}
                >
                    <option>Price Range</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>
            </div>

            <div className='flex justify-evenly mx-5'>
                <button
                    className="rounded w-28
                            bg-blue-500 hover:bg-blue-700 text-white
                            font-bold
                            px-1 py-2              
                            focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={event => handleUpdate(event)}
                >
                    Update
                </button>

                <button className="rounded w-28
                            bg-blue-500 hover:bg-blue-700 text-white
                            font-bold
                            px-1 py-2
                            focus:outline-none focus:shadow-outline">
                    <Link to={`/`}>
                        Back Home
                    </Link>
                </button>
            </div>
        </form>
    )
}

export default UpdateRestaurantForm
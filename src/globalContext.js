import React, {useState, useContext} from 'react'

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [allRestaurants, setAllRestaurants] = useState([])
    const [restaurantName, setRestaurantName] = useState('')
    const [restaurantLocation, setRestaurantLocation] = useState('')
    const [restaurantPriceRange, setRestaurantPriceRange] = useState('Price Range')
    const [selectedRestaurant, setSelectedRestaurant] = useState('')
    const [reviewIndex, setReviewIndex] = useState(0)
    const [reviewerName, setReviewerName] = useState('')
    const [reviewerRating, setReviewerRating] = useState('Rating')
    const [reviewerComment, setReviewerComment] = useState('')

    return (
        <AppContext.Provider
            value={{
                allRestaurants, setAllRestaurants,
                restaurantName, setRestaurantName,
                restaurantLocation, setRestaurantLocation,
                restaurantPriceRange, setRestaurantPriceRange,
                selectedRestaurant, setSelectedRestaurant,
                reviewIndex, setReviewIndex,
                reviewerName, setReviewerName,
                reviewerRating, setReviewerRating,
                reviewerComment, setReviewerComment
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext)
export {AppContext, AppProvider}
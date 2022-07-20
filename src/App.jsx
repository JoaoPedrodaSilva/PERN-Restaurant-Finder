import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ReviewRestaurantPage from './pages/ReviewRestaurantPage'
import UpdateRestaurantPage from './pages/UpdateRestaurantPage'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/restaurants/:id' element={<ReviewRestaurantPage />} />
                <Route path='/restaurants/:id/update' element={<UpdateRestaurantPage />} />
            </Routes>            
        </BrowserRouter>
    )
}

export default App
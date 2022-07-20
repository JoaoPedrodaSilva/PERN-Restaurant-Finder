import React, { useEffect } from 'react'
import axios from '../axios'
import { useGlobalContext } from '../globalContext'

const AddRestaurantForm = () => {

  const {
    setReviewIndex,
    restaurantName, setRestaurantName,
    restaurantLocation, setRestaurantLocation,
    restaurantPriceRange, setRestaurantPriceRange
  } = useGlobalContext()

  useEffect(() => {
    setRestaurantName('')
    setRestaurantLocation('')
    setRestaurantPriceRange('Price Range')
    setReviewIndex(0)
  }, [])

  const handleAdd = async event => {
    event.preventDefault()
    try {
      await axios.post('/', {
        name: restaurantName,
        location: restaurantLocation,
        price_range: restaurantPriceRange,
      })
      window.location.reload(true);
    } catch (error) {
      console.log(error)
    }
  }

  //rendering component
  return (
    <form className="w-full grid grid-cols-12 gap-2 rounded py-6 text-sm">
      <input
        className="appearance-none shadow col-span-4                                               
                        border border-gray-400 hover:border-blue-400 rounded
                        px-1 py-2 
                        text-gray-700 leading-tight
                        focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Restaurant name"
        maxLength={15}
        value={restaurantName}
        onChange={event => setRestaurantName(event.target.value)}
      />

      <input
        className="appearance-none shadow col-span-4                                              
                        border border-gray-400 hover:border-blue-400 rounded
                        px-1 py-2 
                        text-gray-700 leading-tight
                        focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Location"
        maxLength={15}
        value={restaurantLocation}
        onChange={event => setRestaurantLocation(event.target.value)}
      />

      <select
        className="appearance-none shadow col-span-3 
                    border border-gray-400 hover:border-blue-400 rounded
                    px-1 py-2 
                    text-gray-700 leading-tight
                    focus:outline-none focus:shadow-outline"
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

      <button
        className="rounded col-span-1 
                        bg-blue-500 hover:bg-blue-700 text-white
                        font-bold
                        px-1 py-2              
                        focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={event => handleAdd(event)}
      >
        Add
      </button>
    </form>

    //   <Form className='d-flex'>
    //       <Form.Group className="mx-1" controlId="restaurantNameForm">
    //           <Form.Control
    //               type="text"
    //               placeholder="Restaurant name"
    //               value={restaurantName}
    //               onChange={event => setRestaurantName(event.target.value)}    
    //           />
    //       </Form.Group>

    //       <Form.Group className="mx-1" controlId="restaurantLocationForm">
    //           <Form.Control
    //               type="text"
    //               placeholder="Location"
    //               value={restaurantLocation}
    //               onChange={event => setRestaurantLocation(event.target.value)}
    //           />
    //       </Form.Group>

    //       <Form.Group className="mx-1" controlId="restaurantPriceRangeForm">
    //           <Form.Select
    //               aria-label="restaurantPriceRangeSelect"
    //               className='text-muted text-truncate'
    //               value={restaurantPriceRange}
    //               onChange={event => setRestaurantPriceRange(event.target.value)}    
    //           >
    //                   <option>Price Range</option>
    //                   <option value="1">$</option>
    //                   <option value="2">$$</option>
    //                   <option value="3">$$$</option>
    //                   <option value="4">$$$$</option>
    //                   <option value="5">$$$$$</option>
    //           </Form.Select>
    //       </Form.Group>

    //       <Button
    //           variant="primary"
    //           type="submit"
    //           className='mx-1'
    //           onClick={(event) => handleAdd(event)}
    //       >
    //           Add
    //       </Button>
    // </Form>
  )
}

export default AddRestaurantForm
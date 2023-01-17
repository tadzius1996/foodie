import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Currency from 'react-currency-formatter'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice'
import BasketIcon from '../components/BasketIcon'

const Dishes = ({route}) => {
    const dishes = route.params.dishes;
    const [isPressed, setIsPressed] = useState(false);
    const dispatch = useDispatch();

   

    const removeItemFromBasket = () => {
      if (!items.length > 0) return;

      dispatch(removeFromBasket({id:dishes._id}))
    }
    

    console.log(dishes)
    return (
      <View>
      {dishes.map((dish, id) => {
          const items = useSelector((state) => selectBasketItemsWithId(state, dish._id));

          const removeItemFromBasket = () => {
            if (!items.length > 0) return;
      
            dispatch(removeFromBasket({id:dish._id}))
          }
          return (
              <View key={id}>

              <TouchableOpacity onPress={() => setIsPressed(!isPressed)} className={`bg-white border p-4 border-gray-200 ${
                  isPressed && 'border-b-0'
              }`}>
                <View className='flex-row'>
                <View className='flex-1 or-2'>
                  <Text className='text-lg mb-1'>{dish.name}</Text>
                  <Text className='text-gray-400'>{dish.short_description}</Text>
                  <Text className='text-gray-400 mt-2'>
                      <Currency quantity={dish.price} currency='GBP' />
                  </Text>
                </View>
                <View>
                  <Image
                  style={{
                      borderWidth: 1,
                      borderColor: '#F3F3F4'
                  }}
                    source={{uri: urlFor(dish.image).url()}}
                    className='h-20 w-20 bg-gray-300 p-4 ml-1'
                    />
                </View>
                </View>
              </TouchableOpacity>

              {isPressed && (
                  <View key={dish._name} className='bg-white px-4'>
                      <View className='flex-row items-center space-x-2 pb-3'>
                          <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
                            <MinusCircleIcon color={items.length > 0 ? '#00CCBB' : 'gray'} size={40}/>
                          </TouchableOpacity>

                          <Text>{items.length}</Text>

                          <TouchableOpacity onPress={() => {
                           dispatch(addToBasket({ id: dish._id, name:dish.name, description:dish.description, price:dish.price, image:dish.image }));
                          
                           }}>
                           <PlusCircleIcon color='#00CCBB' size={40} />
                           </TouchableOpacity>

                      </View>
                  </View>
              )}

              </View>
          )
      })}
      <View className='relative pb-32'>
                <BasketIcon className='absolute bottom-0 left-0'/>
              </View>
  </View>
    )
}


export default Dishes
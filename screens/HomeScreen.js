import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {AdjustmentsHorizontalIcon, ChevronDownIcon, MagnifyingGlassCircleIcon, UserCircleIcon} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity'

const HomeScreen = () => {
    const navigation =  useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState()
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
      sanityClient.fetch(`
      *[_type == 'featured'] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }`).then(data => {
        setFeaturedCategories(data)
        
      })
    }, [])

    const handleSearch = (query) => {
      let filteredDishes = []
      featuredCategories?.map(category => {
        category.restaurants.map(restaurant => {
          filteredDishes = [...filteredDishes, ...restaurant.dishes.filter(dish => dish.name.toLowerCase().includes(query.toLowerCase()))]
        });
      });
      setSearchResults(filteredDishes);
      if(filteredDishes.length > 0) navigation.navigate("Dishes", {dishes: filteredDishes});
    }

    useEffect(() => {
      if(featuredCategories) {
          let filteredDishes = []
          featuredCategories.map(category => {
              category.restaurants.map(restaurant => {
                  filteredDishes = [...filteredDishes, ...restaurant.dishes.filter(dish => dish.name.toLowerCase().includes(searchQuery.toLowerCase()))]
              });
          });
          setSearchResults(filteredDishes);
      }
  }, [searchQuery, featuredCategories]);

  return (
    <SafeAreaView className='bg-red-500 pt-5'>
        <View className='flex-row pb-3 justify-between items-center mx-4 space-x-2 '>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/foodie.png')}
              className='h-10 w-28 '
              
            />
            </TouchableOpacity>

            <UserCircleIcon size={35} color='#00FFFF' />

        </View>

        <View className='flex-row items-center space-x-2 pb-2 mx-4'>
          <View className='flex-row flex-1 space-x-2 bg-[#00FFFF] p-3'>
            <MagnifyingGlassCircleIcon color='gray' size={30} />
            <TextInput
            placeholder='What are you craving for?'
            keyboardType='default'
            onChangeText={text => setSearchQuery(text)}
            onSubmitEditing={() => handleSearch(searchQuery)}
            
            />
          </View>
          <AdjustmentsHorizontalIcon color='#00FFFF' />
        </View>
        <ScrollView className='bg-[#00FFFF]' contentContainerStyle={{
          paddingBottom: 100,
        }}>
          <Categories />

          {searchResults.length > 0 
  ? featuredCategories?.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
              />
          )) : <Text> No dishes found</Text>}

          
          
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('DeliveryScreen')
        }, 4000)
    }, [])
  return (
    <SafeAreaView className='bg-[#00CCBB] flex-1 justify-center items-center'>
      <Animatable.Image
        source={require("../assets/loadingScreen.gif")}
        animation='slideInUp'
        itereationCount={1}
        className='h-auto w-96'
      />

      <Animatable.Text
        animation='slideInUp'
        iterationCount={1}
        className='text-lg my-10 text-white font-bold text-center'
      >
        Awaiting confirmation of your order from the restaurant.
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color='white' className='pb-20' />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen
import { ActivityIndicator, View } from 'react-native';

export function Loading() {
  return (
    <View className='flex-1 justify-center items-center bg-sky-500'>
      <ActivityIndicator size="large" color="#292524" />
    </View>
  );
}

import tw from '@/tailwind.config.native'
import { TouchableOpacity, Text } from 'react-native'


const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}: any) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[tw`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`, isLoading && tw`opacity-50`]}
        disabled={isLoading}
    >
      <Text style={tw`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
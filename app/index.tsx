import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Aora</Text>
      <StatusBar style='auto' />
      <Link href="/profile" style={{color: 'blue'}}>Go to Profile</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function PreviewAndPublication(){
    return (
        <View style={styles.container}>
            <Text>תצוגה ופרסום</Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
})
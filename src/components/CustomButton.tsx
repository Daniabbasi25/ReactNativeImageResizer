import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import React, { FC } from 'react'

interface Props extends TouchableOpacityProps{
    title:string,
    type:'Next'|'Library'|'Camera'
}
const CustomButton:FC<Props> = (props) => {
    const { title, type,...res } = props
    const Bottom=type=='Library'?0:type=='Camera'?50:100
  return (
    <TouchableOpacity style={[styles.container,{bottom:Bottom, right:10}]} {...res}>
        <Text style={styles.textStyle}>
{title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container:{
        backgroundColor:'blue',
        position:'absolute',
        padding:10,
        borderRadius:10
        },
    textStyle:{
        color:'#fff',
        fontSize:20,
    
    }
})
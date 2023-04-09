import React from 'react'
import { Image } from 'antd'
import LogoImage from './../../resources/logo.jpg'

function Logo({ width, onClick, style}) {
  return (
    <Image 
        src={ LogoImage } 
        alt="Almighty Logo" 
        width={ width } 
        preview={false} 
        style={style}
        onClick={onClick}/>
  )
}

export default Logo
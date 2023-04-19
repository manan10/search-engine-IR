import React from 'react'
import { Image } from 'antd'
import LogoImage from './../../resources/logo2.jpg'

function Logo({ width, onClick, style, className}) {
  return (
    <Image 
        className={ className ? className : '' }
        src={ LogoImage } 
        alt="Almighty Logo" 
        width={ width } 
        preview={false} 
        style={style}
        onClick={onClick}/>
  )
}

export default Logo
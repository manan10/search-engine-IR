import React from 'react'
import Tab from './Tab/Tab'

function EngineTabs({ onChangeEngine, engine }) {
  const tabs = [
    { title: "Almighty SE", value: "almighty" },
    { title: "Google SE", value: "google" },
    { title: "Bing SE", value: "bing" } 
  ]
  return (
    <div style={{ marginTop: '80px' }}>
        {
          tabs.map(ele => {
            return (
              <Tab 
                title={ ele.title } 
                value={ ele.value } 
                key={ ele.value } 
                onClickTab={ onChangeEngine } 
                engine = { engine }/>
            )
          })
        }

    </div>
  )
}

export default EngineTabs

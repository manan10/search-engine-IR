import { ConfigProvider, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react'

function LoadingSpinner() {
  const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <ConfigProvider theme={{ components: { 
            Spin: {
                colorPrimary: 'white',
                fontSize: '20px',
            }
        }}}>
            <Spin tip="Fetching results..." size='large' indicator={ antIcon } />
        </ConfigProvider>
    </div>
  )
}

export default LoadingSpinner
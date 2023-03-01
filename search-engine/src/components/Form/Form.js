import Input from 'antd/es/input/Input'
import React from 'react'
import RadioGroup from './RadioGroup';
import Options from './Options';
import { Button } from 'react-bootstrap';
import './Form.css'
import { ConfigProvider } from 'antd';

function Form({ search, model, cluster, expansion, onChangeQuery, onChangeModel, onChangeCluster, onChangeExpansion }) {
    return (
        <div className='Form'>
            <div style={{ textAlign:  'left' }}>
            <ConfigProvider 
                theme={{
                    components: {
                        Radio: {
                            colorPrimary: '#24282c',
                        },
                    },
                }}>
                    <RadioGroup label="Query Model" options={ Options.model } onChange={ onChangeModel } value={ model } />
                    <RadioGroup label="Clustering method" options={ Options.cluster } onChange={ onChangeCluster } value={ cluster } />
                    <RadioGroup label="Expansion method" options={ Options.expansion } onChange={ onChangeExpansion } value={ expansion } />
                </ConfigProvider>
            </div>
            <div className='SearchDiv'>
                <Input placeholder='Search Here' value={ search } onChange={ onChangeQuery } size='large' />
                <Button size='lg' variant='dark' style={{ width: '160px', marginLeft: '5px' }}>SEARCH</Button>
            </div>
        </div>
    )
}

export default Form
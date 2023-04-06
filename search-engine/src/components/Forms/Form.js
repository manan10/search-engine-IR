import React from 'react'
import { Button } from 'react-bootstrap';
import { ConfigProvider } from 'antd';
import Input from 'antd/es/input/Input'

import RadioGroup from '../RadioGroups/RadioGroup';
import Options from '../../resources/Options';
import colors from '../../theme/Colors';
import classes from './Form.module.css'

function Form({ search, model, cluster, expansion, onChangeQuery, onChangeModel, onChangeCluster, onChangeExpansion, onClick }) {
    const themeComponents = {
        Radio: {
            colorPrimary: colors.primaryColor,
            colorPrimaryHover: colors.primaryColor
        },
        Input: {
            colorBorder: colors.primaryColor,
            colorPrimaryHover: colors.primaryColor
        }
    }
    
    return (
        <div className={ classes.Form }>
            <ConfigProvider theme = {{ components: themeComponents }}>
                <div style={{ textAlign:  'left' }}>
                    <RadioGroup label="Query Model" options={ Options.model } onChange={ onChangeModel } value={ model } />
                    <RadioGroup label="Clustering method" options={ Options.cluster } onChange={ onChangeCluster } value={ cluster } />
                    <RadioGroup label="Expansion method" options={ Options.expansion } onChange={ onChangeExpansion } value={ expansion } />
                </div>
                <div className={ classes.SearchDiv }>
                    <Input placeholder='Search Here' value={ search } onChange={ onChangeQuery } size='large' />
                    <Button size='lg' variant='dark' style={{ width: '160px', marginLeft: '5px' }} onClick={ onClick }>SEARCH</Button>
                </div>
            </ConfigProvider>
        </div>
    )
}

export default Form
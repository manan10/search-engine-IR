import React from 'react'
import { ConfigProvider, Input } from 'antd'
import { Button } from 'react-bootstrap'

import Options from '../../resources/Options'
import colors from '../../theme/Colors'

import classes from './SmallForm.module.css'
import RadioGroupS from '../RadioGroups/RadioGroupS'

function SmallForm({ search, model, cluster, expansion, onChangeQuery, onChangeModel, onChangeCluster, onChangeExpansion, onClick }) {
    const themeComponents = { 
        Radio: {
            colorText: 'white',
            fontSize: '14px'
        },
        Input: {
            colorBorder: colors.primaryColor,
            colorPrimaryHover: colors.primaryColor,
            borderRadius: '0px !mportant'
        } 
    }


    return (
        <div className={ classes.Form }>
            <ConfigProvider theme = {{ components: themeComponents }}>
                <div style={{ textAlign:  'left' }}>
                    <RadioGroupS label="Query Model" options={ Options.model } onChange={ onChangeModel } value={ model } />
                    <RadioGroupS label="Clustering method" options={ Options.cluster } onChange={ onChangeCluster } value={ cluster } />
                    <RadioGroupS label="Expansion method" options={ Options.expansion } onChange={ onChangeExpansion } value={ expansion } />
                
                    <Input placeholder='Search Here' value={ search } onChange={ onChangeQuery } className={classes.Input} size='large' />
                    <Button variant='success' onClick={ onClick } className="Button">SEARCH</Button>
                </div>
            </ConfigProvider>
        </div>
    )
}

export default SmallForm
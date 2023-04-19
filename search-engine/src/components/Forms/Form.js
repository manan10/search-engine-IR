import React from 'react'
import { Button } from 'react-bootstrap';
import { ConfigProvider } from 'antd';
import Input from 'antd/es/input/Input'

import RadioGroup from '../RadioGroups/RadioGroup';
import Options from '../../resources/Options';
import colors from '../../theme/Colors';
import classes from './Form.module.css'
import useInput from '../../hooks/use-input';

function Form({ onSubmit, withInput }) {   
    const { value: search, onChange: setSearch, isValid }  = useInput('', (val) => val !== '')
    const { value: model, onChange: setModel }  = useInput('pagerank')
    const { value: cluster, onChange: setCluster }  = useInput('none')
    const { value: expansion, onChange: setExpansion }  = useInput('none')
 
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

    const onSubmitQuery = (event) => {
        onSubmit({search, model, cluster, expansion}, isValid)
    }
    
    return (
        <div className={ classes.Form }>
            <ConfigProvider theme = {{ components: themeComponents }}>
                <div style={{ textAlign:  'left' }}>
                    <RadioGroup label="Relevance Model" options={ Options.model } onChange={ setModel } value={ model } />
                    <RadioGroup label="Clustering method" options={ Options.cluster } onChange={ setCluster } value={ cluster } />
                    <RadioGroup label="Expansion method" options={ Options.expansion } onChange={ setExpansion } value={ expansion } />
                </div>

                { withInput && 
                    <div className={ classes.SearchDiv }>
                        <Input placeholder='Search Here' value={ search } onChange={ setSearch } size='large' />
                        <Button size='lg' variant='dark' style={{ width: '160px', marginLeft: '5px' }} onClick={ onSubmitQuery }>SEARCH</Button>
                    </div> 
                }
            </ConfigProvider>
        </div>
    )
}

export default Form
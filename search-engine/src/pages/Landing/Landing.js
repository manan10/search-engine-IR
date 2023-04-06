import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { Image } from 'antd'

import Form from '../../components/Forms/Form'
import colors from '../../theme/Colors'
import Logo from './../../resources/logo.jpg'
import useInput from '../../hooks/use-input'
import classes from './Landing.module.css'

function Landing() {
  const { value: search, onChange: setSearch }  = useInput('')
  const { value: model, onChange: setModel }  = useInput('pagerank')
  const { value: cluster, onChange: setCluster }  = useInput('none')
  const { value: expansion, onChange: setExpansion }  = useInput('none')
  const navigate = useNavigate()

  const onSubmitQuery = (event) => {
    navigate("/result", { replace: true, state: { search, model, cluster, expansion }})
  }
  
  return (
    <div className={classes.Page} style={{ backgroundColor: colors.backgroundColor, color: colors.textPrimaryColor }}>
      <Container className={classes.Container}>
        <Row>
          <Col md={4} lg={4} sm={12} className={classes.LogoContainer}> 
            <Image 
              src={ Logo } 
              alt="Almighty Logo" 
              width={ 150 } 
              preview={false} 
              style={{ borderRadius: '8px', border: '5px solid ' + colors.borderColor }}/>
            <h1>THE ALMIGHTY SEARCH ENGINE</h1>
            <div style={{ marginTop: '60px' }}>
              <h5>A search engine built around </h5>
              <h3>RELIGIONS.</h3>
            </div>
          </Col>
          <Col md={8} lg={8} sm={12} 
            className={classes.FormContainer} 
            style={{ border: "8px outset " +  colors.borderColor, color: colors.textComponentColor, backgroundColor: colors.backgroundColorComponent }}>
              <h2 className='FormTitle' style={{ border: "3px outset " + colors.borderColor }}>SEARCH PARAMETERS</h2>
              <Form 
                search = { search }
                model = { model }
                cluster = { cluster }
                expansion = { expansion }
                onChangeQuery = { setSearch }
                onChangeModel = { setModel }
                onChangeCluster = { setCluster }
                onChangeExpansion = { setExpansion }
                onClick = { onSubmitQuery } 
                />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Landing
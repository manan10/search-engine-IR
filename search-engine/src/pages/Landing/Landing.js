import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import Form from '../../components/Forms/Form'
import colors from '../../theme/Colors'
import useNotify from '../../hooks/use-notify'
import classes from './Landing.module.css'
import Logo from '../../components/Logo/Logo'

function Landing() {
  const navigate = useNavigate()
  const { contextHolder, openNotification } = useNotify()
  const onSubmitQuery = (data, isValid) => {
    if(isValid){
      navigate("/result", { replace: true, state: data })
    } else {
      openNotification('error', 'Try Again', 'Empty search query. Please enter a valid search query.')
    }
  }
  
  return (
    <>
      { contextHolder }
      <div className={classes.Page} style={{ backgroundColor: colors.backgroundColor, color: colors.textPrimaryColor }}>
        <Container className={classes.Container}>
          <Row>
            <Col md={4} lg={4} sm={12} className={classes.LogoContainer}> 
              <Logo className={ classes.Image } width={150} style={{ borderRadius: '150px', height: '150px', border: '2px solid ' + colors.borderColor }} />
              <h1 className={classes.Title} style={{ fontSize: '45px' }}>THE ALMIGHTY SEARCH ENGINE</h1>
              <div style={{ marginTop: '20px' }}>
                <h6>A search engine built around </h6>
                <h3 className={classes.Title}>RELIGIONS.</h3>
              </div>
            </Col>
            <Col md={8} lg={8} sm={12} 
              className={classes.FormContainer} 
              style={{ border: "8px outset " +  colors.borderColor, color: colors.textComponentColor, backgroundColor: colors.backgroundColorComponent }}>
                <h2 className={classes.FormTitle} style={{ border: "3px outset " + colors.borderColor }}>SEARCH PARAMETERS</h2>
                <Form onSubmit = { onSubmitQuery } withInput={true}/>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Landing
import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Form from '../../components/Form/Form'
import colors from '../../theme/Colors'
import './Landing.css'

function Landing() {
  const [ search, setSearch ] = useState("")
  const [ model, setModel ] = useState("pagerank")
  const [ cluster, setCluster ] = useState("none")
  const [ expansion, setExpansion ] = useState("none")

  const onChangeQuery = (event) => setSearch(event.target.value)
  const onChangeModel = (event) => setModel(event.target.value)
  const onChangeCluster = (event) => setCluster(event.target.value)
  const onChangeExpansion = (event) => setExpansion(event.target.value)
  const onSubmitQuery = (event) => {
    // Send to result page
  }
  
  return (
    <div className='Page' style={{ backgroundColor: colors.backgroundColor, color: colors.textPrimaryColor }}>
      <Container className='Container'>
        <Row>
          <Col md={4} lg={4} sm={12} className="LogoContainer">  
            <h1>THE ALMIGHTY SEARCH ENGINE</h1>
            <div style={{ marginTop: '80px' }}>
              <h5>A search engine built around </h5>
              <h3>RELIGIONS.</h3>
            </div>
          </Col>
          <Col md={8} lg={8} sm={12} 
            className="FormContainer" 
            style={{ border: "8px outset " +  colors.borderColor, color: colors.textComponentColor, backgroundColor: colors.backgroundColorComponent }}>
              <h2 className='FormTitle' style={{ border: "3px outset " + colors.borderColor }}>SEARCH PARAMETERS</h2>
              <Form 
                search = { search }
                model = { model }
                cluster = { cluster }
                expansion = { expansion }
                onChangeQuery = { onChangeQuery }
                onChangeModel = { onChangeModel }
                onChangeCluster = { onChangeCluster }
                onChangeExpansion = { onChangeExpansion }
                />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Landing
import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Form from '../../components/Form/Form'
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
  
  return (
    <div className='Page'>
      <Container className='Container'>
        <Row>
          <Col md={4} lg={4} sm={12} className="LogoContainer">  
            <h1>THE ALMIGHTY SEARCH ENGINE</h1>
            <div style={{ marginTop: '80px' }}>
              <h5>A search engine built around </h5>
              <h3>RELIGIONS.</h3>
            </div>
          </Col>
          <Col md={8} lg={8} sm={12} className="FormContainer">
            <h2 className='FormTitle'>SEARCH PARAMETERS</h2>
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
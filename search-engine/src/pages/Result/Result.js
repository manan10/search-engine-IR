import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import EngineTabs from '../../components/EngineTabs/EngineTabs'
import SmallForm from '../../components/SmallForm/SmallForm'

import colors from '../../theme/Colors'
import Almighty from './Almighty/Almighty'
import Bing from './Bing/Bing'
import Google from './Google/Google'
import './Result.css'

function Result() {
  const location = useLocation()
  const navigate = useNavigate()

  const [ search, setSearch ] = useState("")
  const [ model, setModel ] = useState("pagerank")
  const [ cluster, setCluster ] = useState("none")
  const [ expansion, setExpansion ] = useState("none")
  const [ engine, changeEngine ] = useState("google")

  const onChangeQuery = (event) => setSearch(event.target.value)
  const onChangeModel = (event) => setModel(event.target.value)
  const onChangeCluster = (event) => setCluster(event.target.value)
  const onChangeExpansion = (event) => setExpansion(event.target.value)
  const onChangeEngine = (value) => changeEngine(value)
  const onLogoClick = (event) => {
    navigate('/', { replace: true })
  }
  const onSubmitQuery = (event) => {
    navigate("/result", { replace: true, state: { search, model, cluster, expansion }})
  }

  useEffect(() => {
    const { search, model, cluster, expansion } = location.state
    setSearch(search)
    setModel(model)
    setCluster(cluster)
    setExpansion(expansion)
  }, [location.state])
  
  return (
    <div className='ResultPage' style={{ backgroundColor: colors.backgroundColor, color: colors.primaryColor }}>
      <Container className='Container' fluid>
        <Row>
          <Col md={2} lg={2} sm={12} className="SideContainer">
            <h4 style={{ color: 'white', cursor: 'pointer' }} onClick={ onLogoClick }>THE ALMIGHTY SEARCH ENGINE</h4>
            <EngineTabs onChangeEngine={ onChangeEngine } engine = { engine } />
          </Col>
          <Col md={8} lg={8} sm={12} className="ResultContainer" 
            style={{ border: "8px outset " +  colors.borderColor, color: colors.textComponentColor, backgroundColor: colors.backgroundColorComponent }}>
              { engine === "almighty" ? <Almighty /> : null }   
              { engine === "google" ? <Google queryString={ search } /> : null }
              { engine === "bing" ? <Bing queryString={ search } /> : null }
          </Col>
          <Col md={2} lg={2} sm={12} className="SideContainer">
            <SmallForm 
              search = { search }
              model = { model }
              cluster = { cluster }
              expansion = { expansion }
              onChangeQuery = { onChangeQuery }
              onChangeModel = { onChangeModel }
              onChangeCluster = { onChangeCluster }
              onChangeExpansion = { onChangeExpansion }
              onClick = { onSubmitQuery } 
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Result
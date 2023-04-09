import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import { ConfigProvider, Input, Tooltip } from 'antd'
import { Button } from 'react-bootstrap'
import { FiSettings, FiSearch } from 'react-icons/fi'

import EngineTabs from '../../components/EngineTabs/EngineTabs'
import colors from '../../theme/Colors'
import Almighty from './Almighty/Almighty'
import Bing from './Bing/Bing'
import Google from './Google/Google'
import Logo from '../../components/Logo/Logo'
import useInput from '../../hooks/use-input'
import SettingsModal from '../../components/Modal/SettingsModal'
import classes from './Result.module.css'

function Result() {
  const location = useLocation()
  const navigate = useNavigate()

  // const [ search, setSearch ] = useState("")
  // const [ model, setModel ] = useState("pagerank")
  // const [ cluster, setCluster ] = useState("none")
  // const [ expansion, setExpansion ] = useState("none")

  const [ engine, changeEngine ] = useState("almighty")
  const [ isModalOpen, setIsModalOpen ] = useState(false)

  const { value: search, onChange: setSearch, setVal: setValSearch }  = useInput('', (val) => val !== '')
  const { value: model, onChange: setModel, setVal: setValModel }  = useInput('pagerank')
  const { value: cluster, onChange: setCluster, setVal: setValCluster }  = useInput('none')
  const { value: expansion, onChange: setExpansion, setVal: setValExpansion }  = useInput('none')

  // const onChangeQuery = (event) => setSearch(event.target.value)
  // const onChangeModel = (event) => setModel(event.target.value)
  // const onChangeCluster = (event) => setCluster(event.target.value)
  // const onChangeExpansion = (event) => setExpansion(event.target.value)
  const onChangeEngine = (value) => changeEngine(value)
  const onLogoClick = () => navigate('/', { replace: true })
  const onSettingsClicked = (event) => setIsModalOpen(true)
  const onSubmitQuery = (event) => {
    // navigate("/result", { replace: true, state: { search, model, cluster, expansion }})
  }

  const themeComponents = { 
      Radio: {
        colorPrimary: colors.primaryColor,
        colorPrimaryHover: colors.primaryColor
      },
      Input: {
          colorBorder: colors.primaryColor,
          colorPrimaryHover: colors.primaryColor,
          borderRadius: '0px !mportant'
      } 
  }

  useEffect(() => {
    const { search, model, cluster, expansion } = location.state
    setValSearch(search)
    setValModel(model)
    setValCluster(cluster)
    setValExpansion(expansion)
    // eslint-disable-next-line
  }, [location.state])  
  
  return (
    <div className={classes.ResultPage} style={{ backgroundColor: colors.backgroundColor, color: colors.primaryColor }}>
      <ConfigProvider theme = {{ components: themeComponents }}>                
        { 
          isModalOpen && createPortal(
            <SettingsModal 
              isModelOpen={isModalOpen} setIsModalOpen={setIsModalOpen} 
              model={model} cluster={cluster} expansion={expansion} 
              setModel={setModel} setCluster={setCluster} setExpansion={setExpansion} />
            , document.getElementById("modal")) 
        }
        <Container className={classes.Container} fluid>
          <div className={classes.TopContainer}>
              <Logo width={ 60 } style={{ borderRadius: '50px', border: '2px solid ' + colors.borderColor, cursor: 'pointer' }} onClick={ onLogoClick }/>
              <h5 style={{ color: 'white', marginLeft: '10px', cursor: 'pointer'}} onClick={onLogoClick}>THE ALMIGHTY</h5>
              <Input placeholder='Search Here' value={ search } onChange={ setSearch } className={classes.Input} size='large' />
              <Tooltip title="Search" color='#198754' placement='topRight'>
                <Button variant='success' onClick={ onSubmitQuery } className={classes.Button} size='small'><FiSearch /></Button>
              </Tooltip>
              <Tooltip title="Change search parameters" color='#DC3545' placement='topRight'>
                <Button variant='danger' onClick={ onSettingsClicked } className={classes.Button} size='small'><FiSettings /></Button>
              </Tooltip>
          </div>
          
          <Row>
            <Col md={2} lg={2} sm={12} className={classes.SideContainer}>
              <EngineTabs onChangeEngine={ onChangeEngine } engine = { engine } />
            </Col>
            <Col md={10} lg={10} sm={12} className={classes.ResultContainer} 
              style={{ border: "8px outset " +  colors.borderColor, color: colors.textComponentColor, backgroundColor: colors.backgroundColorComponent }}>
                { engine === "almighty" ? <Almighty /> : null }   
                { engine === "google" ? <Google queryString={ search } /> : null }
                { engine === "bing" ? <Bing queryString={ search } /> : null }
            </Col>
          </Row>
        </Container>
      </ConfigProvider> 
    </div>
  )
}

export default Result
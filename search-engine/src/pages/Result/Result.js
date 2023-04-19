import React, { useEffect, useState, useRef } from 'react'
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
  const pageRef = useRef(null)

  const [ results, setResults ] = useState([])
  const [ engine, changeEngine ] = useState("almighty")
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ query, setQuery ] = useState("")

  const { value: search, onChange: setSearch, setVal: setValSearch }  = useInput('', (val) => val !== '')
  const { value: model, onChange: setModel, setVal: setValModel }  = useInput('pagerank')
  const { value: cluster, onChange: setCluster, setVal: setValCluster }  = useInput('none')
  const { value: expansion, onChange: setExpansion, setVal: setValExpansion }  = useInput('none')
  

  const onChangeEngine = (value) => changeEngine(value)
  const onLogoClick = () => navigate('/', { replace: true })
  const onSettingsClicked = (event) => setIsModalOpen(true)
  const gotoTop = () => pageRef.current.scrollIntoView()

  const onSubmitQuery = (event) => {
    // send request here
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

    // Dummy
    const dummy = [
      { id: 'Google1', name: 'Google', src: 'https://www.google.com', desc: 'Google Search Engine' },
      { id: 'Google2', name: 'Google', src: 'https://www.google.com', desc: 'Google Search Engine' },
      { id: 'Google3', name: 'Google', src: 'https://www.google.com', desc: 'Google Search Engine' },
      { id: 'Google4', name: 'Google', src: 'https://www.google.com', desc: 'Google Search Engine' },
      { id: 'Google5', name: 'Google', src: 'https://www.google.com', desc: 'Google Search Engine' },
      { id: 'Google6', name: 'Google', src: 'https://www.google.com', desc: 'Google Search Engine' },
      { id: 'Spotify1', name: 'Spotify', src: 'https://www.spotify.com', desc: 'Spotify Music Player' },
      { id: 'Spotify2', name: 'Spotify', src: 'https://www.spotify.com', desc: 'Spotify Music Player' },
      { id: 'Spotify3', name: 'Spotify', src: 'https://www.spotify.com', desc: 'Spotify Music Player' },
      { id: 'Spotify4', name: 'Spotify', src: 'https://www.spotify.com', desc: 'Spotify Music Player' },
      { id: 'Spotify5', name: 'Spotify', src: 'https://www.spotify.com', desc: 'Spotify Music Player' },
      { id: 'Spotify6', name: 'Spotify', src: 'https://www.spotify.com', desc: 'Spotify Music Player' },
      { id: 'Spotify7', name: 'Spotify', src: 'https://www.spotify.com', desc: 'Spotify Music Player' },
    ]
    setResults(dummy)
    setQuery(search)
    
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
              <Logo width={ 60 } className={ classes.Image } style={{ border: '2px solid ' + colors.borderColor }} onClick={ onLogoClick }/>
              <h5 className={classes.Title} onClick={onLogoClick}>THE ALMIGHTY</h5>
              <Input placeholder='Search Here' value={ search } onChange={ setSearch } className={classes.Input} size='large' style={{ border: '3px solid ' + colors.borderColor }} />
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
            <Col ref={ pageRef } md={10} lg={10} sm={12} className={ engine === 'almighty' ? classes.Almighty : classes.ResultContainer} 
              style={{ border: "5px solid " +  colors.borderColor }}>
                { engine === "almighty" ? <Almighty results = { results }  gotoTop = { gotoTop } query={ query }/> : null }   
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
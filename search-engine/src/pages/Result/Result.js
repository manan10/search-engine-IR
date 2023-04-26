import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import { ConfigProvider, Input, Tooltip } from 'antd'
import { Button } from 'react-bootstrap'
import { FiSettings, FiSearch } from 'react-icons/fi'
import axios from 'axios'

import EngineTabs from '../../components/EngineTabs/EngineTabs'
import colors from '../../theme/Colors'
import Almighty from './Almighty/Almighty'
import Bing from './Bing/Bing'
import Google from './Google/Google'
import Logo from '../../components/Logo/Logo'
import useInput from '../../hooks/use-input'
import SettingsModal from '../../components/Modal/SettingsModal'
import { api } from '../../resources/api'
import useNotify from '../../hooks/use-notify'
import classes from './Result.module.css'

function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const pageRef = useRef(null)
  const { contextHolder, openNotification } = useNotify()

  const [ results, setResults ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ engine, changeEngine ] = useState("almighty")
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ query, setQuery ] = useState("")

  const { value: search, onChange: setSearch, setVal: setValSearch, isValid }  = useInput('', (val) => val !== '')
  const { value: mode, onChange: setMode, setVal: setValMode }  = useInput('pagerank')
  
  const onChangeEngine = (value) => changeEngine(value)
  const onLogoClick = () => navigate('/', { replace: true })
  const onSettingsClicked = (event) => setIsModalOpen(true)
  const gotoTop = () => pageRef.current.scrollIntoView()

  const onSubmitQuery = async (valid, query = null, defMode = null) => {
    if (valid) {
      setError(null)
      setIsLoading(true)
      try {
        const queryParams = {
          query: query ? query : search,
          type: defMode ? defMode : mode,
        }
        const response = await axios.get(api.baseURL + 'indexer', { params: queryParams })
        setResults(response.data.results)
        setQuery(response.data.query)
        setValSearch(response.data.query)
      } catch(err) {
        setError('Something went wrong')
      } 
      setIsLoading(false)
    } else {
      openNotification('error', 'Try Again', 'Empty search query. Please enter a valid search query.')
    }
  }

  const themeComponents = { 
      Radio: {
        colorPrimary: colors.primaryColor,
        colorPrimaryHover: colors.primaryColor
      },
      Input: {
          colorBorder: colors.primaryColor,
          colorPrimaryHover: colors.primaryColor,
          borderRadius: '0px !important'
      } 
  }

  useEffect(() => {
    const { search, mode } = location.state
    setValSearch(search)
    setValMode(mode)
    setQuery(search)
    onSubmitQuery(true, search, mode)
    // eslint-disable-next-line
  }, [location.state])  
  
  return (
    <div className={classes.ResultPage} style={{ backgroundColor: colors.backgroundColor, color: colors.primaryColor }}>
      { contextHolder }
      <ConfigProvider theme = {{ components: themeComponents }}>                
        { 
          isModalOpen && createPortal(
            <SettingsModal 
              isModelOpen={isModalOpen} setIsModalOpen={setIsModalOpen} 
              mode={mode} 
              setMode={setMode} />
            , document.getElementById("modal")) 
        }

        <Container className={classes.Container} fluid>
          <div className={classes.TopContainer}>
              <Logo width={ 60 } className={ classes.Image } style={{ border: '2px solid ' + colors.borderColor }} onClick={ onLogoClick }/>
              <h5 className={classes.Title} onClick={onLogoClick}>THE ALMIGHTY</h5>
              <Input placeholder='Search Here' value={ search } onChange={ setSearch } className={classes.Input} size='large' style={{ border: '3px solid ' + colors.borderColor }} />
              <Tooltip title="Search" color='#198754' placement='topRight'>
                <Button variant='success' onClick={ () => onSubmitQuery(isValid) } className={classes.Button} size='small'><FiSearch /></Button>
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
                { engine === "almighty" ? 
                    results && 
                    <Almighty results = { results }  
                              query={ query }
                              isLoading={ isLoading }
                              gotoTop = { gotoTop }
                              error={ error } /> 
                : null }   
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
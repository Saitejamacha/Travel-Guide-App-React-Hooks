import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import TravelData from '../TravelData'
import {
  MainContainer,
  AppContainer,
  Heading,
  TravelDataUnList,
} from './styledComponents'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

const TravelGuide = () => {
  const [apiResponse, setApiStatus] = useState({
    apiStatus: apiStatusConstant.initial,
    data: null,
  })

  useEffect(() => {
    const getApiData = async () => {
      setApiStatus({
        apiStatus: apiStatusConstant.inProgress,
        data: null,
      })

      const url = 'https://apis.ccbp.in/tg/packages'
      const options = {
        method: 'GET',
      }

      const response = await fetch(url, options)
      const responseData = await response.json()

      // console.log(response)
      //   console.log(responseData.packages)

      const formattedData = responseData.packages.map(eachData => ({
        description: eachData.description,
        id: eachData.id,
        imageUrl: eachData.image_url,
        name: eachData.name,
      }))

      if (response.ok) {
        setApiStatus({
          apiStatus: apiStatusConstant.success,
          data: formattedData,
        })
      }
    }

    getApiData()
  }, [])

  const renderApiSuccessView = () => {
    const {data} = apiResponse
    const printingData = data.map(each => (
      <TravelData travelData={each} key={each.id} />
    ))
    return <TravelDataUnList>{printingData}</TravelDataUnList>
  }

  const renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  const renderTravelGuide = () => {
    const {apiStatus} = apiResponse

    switch (apiStatus) {
      case apiStatusConstant.success:
        return renderApiSuccessView()
      case apiStatusConstant.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <MainContainer>
      <Heading>Travel Guide</Heading>
      <AppContainer>{renderTravelGuide()}</AppContainer>
    </MainContainer>
  )
}

export default TravelGuide

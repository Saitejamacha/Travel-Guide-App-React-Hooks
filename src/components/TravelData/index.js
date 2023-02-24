import {TravelDataList, Image, PlaceName, PlaceText} from './styledComponents'

const TravelData = props => {
  const {travelData} = props
  const {description, imageUrl, name} = travelData

  console.log(imageUrl)
  return (
    <TravelDataList>
      <Image src={imageUrl} alt={name} />
      <PlaceName>{name}</PlaceName>
      <PlaceText>{description}</PlaceText>
    </TravelDataList>
  )
}

export default TravelData

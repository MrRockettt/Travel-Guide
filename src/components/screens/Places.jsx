import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../includes/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import geoAltIcon from "../../assets/images/geo-alt.svg";
import axios from "axios";
import { BASE_URL } from "../../../src/axiosConfig";

function Places() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}places/`)
      .then((response) => {
        setPlaces(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderPlaces = () => {
    return places.map((place) => (
      <PlaceCard key={place.id}>
        {" "}
        <PlaceCardLink to={`/place/${place.id}`}>
          <PlaceImage src={place.image} alt={place.name} />{" "}
          <PlaceBottomContainer>
            <PlaceTitle>{place.name}</PlaceTitle>
            <Location>
              <LocationIcon src={geoAltIcon} alt="Location icon" />
              <LocationName>{place.location}</LocationName>
            </Location>
          </PlaceBottomContainer>
        </PlaceCardLink>
      </PlaceCard>
    ));
  };

  return (
    <>
      <Helmet>
        <title>Places | Travel Guide</title>
      </Helmet>
      <Header />
      <TopContainer>
        <Heading>Welcome Salmon Kumar</Heading>
        <Paragraph>Explore the world around you</Paragraph>
      </TopContainer>
      <PlacesContainer>{renderPlaces()}</PlacesContainer>
    </>
  );
}

const TopContainer = styled.div`
  width: 90%;
  margin: 10px auto 0;
`;
const Heading = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;
const Paragraph = styled.p`
  font-size: 22px;
  color: #dfdfe2;
`;
const PlacesContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 50px auto 0;
`;
const PlaceCard = styled.li`
  width: 23.5%;
  margin-right: 2%;
  margin-bottom: 25px;
  list-style: none;
  &:nth-child(4n) {
    margin-right: 0;
  }
`;
const PlaceCardLink = styled(Link)`
  display: block;
  appearance: none;
`;
const PlaceImage = styled.img`
  width: 100%;
  display: block;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const PlaceBottomContainer = styled.div`
  padding: 10px 15px;
`;
const PlaceTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
`;
const Location = styled.div`
  display: flex;
`;
const LocationIcon = styled.img`
  margin-right: 10px;
`;
const LocationName = styled.span`
  font-size: 12px;
`;

export default Places;

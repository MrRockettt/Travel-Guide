import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../includes/Header";
import locatIcon from "../../assets/images/geo-alt.svg";
import { Helmet } from "react-helmet";
import axios from "axios";
import styled from "styled-components";
import { BASE_URL } from "../../../src/axiosConfig";
import { UserContext } from "../../App";

function Place() {
  const { id } = useParams();
  const [place, setPlace] = useState({
    name: "",
    gallery: [],
  });

  const { userData } = useContext(UserContext);

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`${BASE_URL}places/protected/${id}`, {
        headers: {
          Authorization: `Bearer ${userData?.access}`,
        },
      })
      .then((response) => {
        if (isMounted) {
          setPlace(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      isMounted = false;
    };
  }, [id, userData]);

  return (
    <>
      <Helmet>
        <title>{place.name} | Travel Guide</title>
      </Helmet>
      <Header />
      <MainContainer>
        <Title>{place.name}</Title>
        <InfoContainer>
          <CategoryName>{place.category_name}</CategoryName>
          <LocationContainer>
            <LocationIcon src={locatIcon} alt="Location Icon" />
            <LocationName>{place.location}</LocationName>
          </LocationContainer>
        </InfoContainer>
        <GalleryContainer>
          <GalleryImageItem>
            <GalleryImage src={place.image} alt="Main Image" />
          </GalleryImageItem>

          {place.gallery.map((image, index) => (
            <GalleryImageItem key={index}>
              <GalleryImage
                src={image.image}
                alt={`Gallery Image ${index + 1}`}
              />
            </GalleryImageItem>
          ))}
        </GalleryContainer>

        <SubHeading>Place Details</SubHeading>
        <Description>{place.description}</Description>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  width: 70%;
  margin: 70px auto 0;
`;
const Title = styled.h1`
  font-size: 45px;
  margin-bottom: 15px;
`;
const InfoContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;
const CategoryName = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-block;
  border: 1px solid #9c9c9c;
  color: #9c9c9c;
  margin-right: 15px;
`;
const LocationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LocationIcon = styled.img`
  margin-right: 5px;
`;
const LocationName = styled.span`
  color: #9c9c9c;
  font-weight: bold;
  font-size: 14px;
`;
const GalleryContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 35px;
`;
const GalleryImageItem = styled.li`
  &:first-child {
    grid-column-end: span 2;
    grid-row-end: span 2;
  }
`;
const GalleryImage = styled.img`
  width: 100%;
  display: block;
`;
const SubHeading = styled.h3`
  font-size: 25px;
  margin-bottom: 20px;
`;
const Description = styled.p`
  font-size: 16px;
  line-height: 1.6em;
`;

export default Place;

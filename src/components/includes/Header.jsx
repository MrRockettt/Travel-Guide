import { useContext } from "react";
import styled from "styled-components";
import logoIcon from "../../assets/images/logo.jpg";
import { UserContext } from "./../../App";
import { useNavigate } from "react-router-dom";

function Header() {
  const { userData, updateUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user_data");
    updateUserData({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Logo src={logoIcon} alt="Logo" />
      <RightBox>
        {userData ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button as="a" href="/auth/login">
            Login
          </Button>
        )}
      </RightBox>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.img`
  width: 200px;
  display: block;
`;
const RightBox = styled.div`
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  width: 80px;
  background-color: #046bf7;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  align-items: center;
  text-align: center;
`;

export default Header;

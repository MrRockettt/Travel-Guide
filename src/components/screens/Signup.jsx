import { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../../axiosConfig";
import axios from "axios";
import { UserContext } from "../../App";
import LogoIcon from "../../assets/images/logo.jpg";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { updateUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setMessage("");
    e.preventDefault();

    axios
      .post(`${BASE_URL}auth/register/`, {
        email,
        password,
        first_name: name,
      })
      .then((response) => {
        const data = response.data.data;
        const status_code = response.data.StatusCode;
        if (status_code === 6000) {
          console.log(response.data);
          localStorage.setItem("user_data", JSON.stringify(data));
          navigate("/");
          updateUserData({ type: "LOGIN", payload: data });
        } else if (status_code === 4000) {
          if (data.email) {
            setMessage(data.email[0]);
          } else if (data.password) {
            setMessage(data.password[0]);
          }
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          setMessage(error.response.data.detail);
        } else {
          setMessage("An unexpected error occurred. Please try again.");
        }
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.type === "text") {
        document.getElementById("email").focus();
      } else if (e.target.type === "email") {
        document.getElementById("password").focus();
      } else if (e.target.type === "password") {
        handleSubmit(e);
      }
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate("/auth/login/");
  };

  return (
    <Container>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LeftContainer>
        <HeaderContainer>
          <Link to="/">
            <LogoImg src={LogoIcon} alt="Website Logo" />
          </Link>
        </HeaderContainer>
        <MainHeading>Travel to the best beautiful places</MainHeading>
      </LeftContainer>
      <RightContainer>
        <LoginContainer>
          <LoginHeading>Signup to your account</LoginHeading>
          <LoginInfo>
            Enter your username, email and password to signup
          </LoginInfo>
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                id="name"
                onKeyDown={handleKeyDown}
              />
            </InputContainer>
            <InputContainer>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                id="email"
                onKeyDown={handleKeyDown}
              />
            </InputContainer>
            <InputContainer>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                id="password"
                onKeyDown={handleKeyDown}
              />
            </InputContainer>
            <SignupButton onClick={handleSignupClick}>
              Already have an account?
            </SignupButton>
            {message && <ErrorMessage>{message}</ErrorMessage>}
            <ButtonContainer>
              <SubmitButton type="submit">Signup</SubmitButton>
            </ButtonContainer>
          </Form>
        </LoginContainer>
      </RightContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 95vh;
  display: flex;
  padding: 15px;
  @media (max-width: 720px) {
    flex-direction: column;
    padding: 10px 80px;
    margin-top: 40px;
    margin-bottom: 40px;
    height: 127vh;
  }
  @media (max-width: 560px) {
    padding: 10px 40px;
  }
  @media (max-width: 410px) {
    padding: 10px 30px;
  }
`;

const LeftContainer = styled.div`
  width: 55%;
  padding: 10px 70px 70px;
  @media (max-width: 990px) {
    width: 40%;
  }
  @media (max-width: 720px) {
    width: 100%;
    padding: 0px 0px;
  }
`;

const RightContainer = styled.div`
  background-color: #efefef;
  width: 45%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 20px;
  padding: 0 70px 10px;
  @media (max-width: 1100px) {
    padding: 20px 40px;
    box-sizing: border-box;
  }
  @media (max-width: 990px) {
    width: 60%;
  }
  @media (max-width: 720px) {
    width: 100%;
    padding: 30px 60px;
    box-sizing: border-box;
  }
  @media (max-width: 450px) {
    padding: 40px 40px;
  }
  @media (max-width: 410px) {
    padding: 40px 30px;
  }
`;

const HeaderContainer = styled.div``;

const LogoImg = styled.img`
  width: 200px;
  display: block;
  @media (max-width: 720px) {
    margin: 0 auto;
  }
  @media (max-width: 410px) {
    width: 160px;
  }
`;

const MainHeading = styled.h1`
  font-weight: bold;
  color: #0c3a4a;
  margin-top: 180px;
  line-height: 1.2em;
  font-size: 3.2vw;
  margin-bottom: 15px;
  @media (max-width: 900px) {
    font-size: 3.2vw;
  }
  @media (max-width: 720px) {
    margin-top: 30px;
    margin-bottom: 50px;
    font-size: 3.9vw;
    text-align: center;
  }
  @media (max-width: 500px) {
    font-size: 4.7vw;
  }
`;

const LoginContainer = styled.div`
  padding-bottom: 50px;
  border-bottom: 1px solid #fff;
  width: 100%;
  @media (max-width: 1100px) {
    padding-bottom: 10px;
    box-sizing: border-box;
  }
`;

const LoginHeading = styled.h1`
  font-size: 32px;
  color: #0c3a4a;
  font-weight: bold;
  margin-bottom: 15px;
  @media (max-width: 1010px) {
    font-size: 28px;
  }
  @media (max-width: 460px) {
    font-size: 27px;
  }
`;

const LoginInfo = styled.p`
  font-size: 18px;
  margin-bottom: 35px;
  @media (max-width: 460px) {
    font-size: 16px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: block;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
  position: relative;
`;

const Input = styled.input`
  padding: 20px 25px 20px 30px;
  border: 1px solid #9c9c9c;
  width: 100%;
  display: block;
  border-radius: 10px;
  font-size: 18px;
  box-sizing: border-box;
  outline: none;
  @media (max-width: 1100px) {
    padding: 17px 25px 17px 30px;
  }
  @media (max-width: 460px) {
    padding: 15px 25px 15px 30px;
  }
  @media (max-width: 410px) {
    padding: 12px 25px 12px 30px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  background-color: #046bf6;
  border: 0;
  outline: 0;
  color: white;
  padding: 15px 40px;
  border-radius: 8px;
  font-size: 19px;
  cursor: pointer;
  @media (max-width: 460px) {
    padding: 10px 25px;
  }
`;

const SignupButton = styled(Link)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 45px;
  color: #046bf6;
  font-size: 17px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 17px;
  margin-bottom: 25px;
  text-align: center;
`;

export default Login;

import { useEffect, createContext, useState, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Places from "./components/screens/Places";
import Place from "./components/screens/Place";
import Signup from "./components/screens/Signup";
import Login from "./components/screens/Login";
import PrivateRoute from "./components/screens/PrivateRoute";

export const UserContext = createContext();

function App() {
  const initialState = { user: null };
  const [loading, setLoading] = useState(true);

  const userReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, user: action.payload };
      case "LOGOUT":
        return { ...state, user: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user_data"));
    if (storedUserData) {
      dispatch({ type: "LOGIN", payload: storedUserData });
    }
    setLoading(false);
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <UserContext.Provider
      value={{ userData: state.user, updateUserData: dispatch }}
    >
      <Routes>
        <Route path="/" element={<Places />} />

        <Route
          path="/place/:id"
          element={<PrivateRoute element={<Place />} />}
        />

        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/create" element={<Signup />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;

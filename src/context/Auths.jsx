import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

const initialState = { isAuth: false, user: {} };

const reducer = (state, { type, payload }) => {
  const { user } = payload || {};
  switch (type) {
    case "SET_LOGIN":
      return { isAuth: true, user };
    case "SET_PROFILE":
      return { ...state, user };
    case "SET_LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const Auths = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem("data"));
    if (user) {
      dispatch({ type: "SET_LOGIN", payload: { user } });
    }
  }, []);

  const registerUser = async (userData) => {
          try {
  
              // const response = await axios.post(`https://workflow-backend-api.vercel.app/api/auth/usercreate`, userData);
              const response = await axios.post(`http://localhost:8000/api/auth/usercreate`, userData);
  
              const { message, isError, success } = response.data;
  
              if (isError) {
                  toast.error(message);
                  return;
              }
  
              return { success };

          } catch (error) {
              console.error('Error registering user:', error);
          }
      };

      const loginUser = async (userData) => {
              try {
      
                  const response = await axios.post(`http://localhost:8000/api/auth/userlogin`, userData);
                  // const response = await axios.post(`https://workflow-backend-api.vercel.app/api/auth/userlogin`, userData);
      
                  const { success, message, isError, data } = response.data;
      
                  if (isError) {
                      toast.error(message);
                      localStorage.removeItem('data');
                      return;
                  }
      
                  if (success) {
                      localStorage.setItem('data', JSON.stringify(data));
                      dispatch({ type: 'SET_LOGIN', payload: { user: data } });
                  }
      
                  return { success, data };
      
              } catch (error) {
                  console.error('Error logging in user:', error);
                  localStorage.removeItem('token');
              }
          };

          const logoutUser = async () => {
              try {
      
                  const response = await axios.delete(`http://localhost:8000/api/auth/userdelete`);
                  // const response = await axios.delete(`https://workflow-backend-api.vercel.app/api/auth/userdelete`, userData);
      
                  const { success, message, isError } = response.data;
      
                  if (isError) {
                      toast.error(message);
                      return;
                  }
      
                  if (success) {
                      localStorage.removeItem('data');
                      dispatch({ type: 'SET_LOGOUT'});
                  }
      
                  return { success };
      
              } catch (error) {
                  console.error('Error logging in user:', error);
                  localStorage.removeItem('token');
              }
          };

  return (
    <userContext.Provider value={{ ...state, reducer, registerUser, loginUser, logoutUser }}>
      {children}
    </userContext.Provider>
  );
};

export const userAuth = () => useContext(userContext);

export default Auths;

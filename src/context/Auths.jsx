import { createContext, useContext, useReducer } from "react";
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

  const registerUser = async (userData) => {
          try {
  
              const response = await axios.post(`${VITE_BASE_URL}/api/auth/usercreate`, userData);
  
              const { success, message, isError } = response.data;
  
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
      
                  const response = await axios.post(`${VITE_BASE_URL}/api/auth/userlogin`, userData);
      
                  const { success, message, isError, data } = response.data;
      
                  if (isError) {
                      toast.error(message);
                      localStorage.removeItem('token');
                      return;
                  }
      
                  if (success) {
                      localStorage.setItem('token', token);
                      dispatch({ type: 'SET_LOGIN', payload: { user: data } });
                  }
      
                  return { success, data };
      
              } catch (error) {
                  console.error('Error logging in user:', error);
                  localStorage.removeItem('token');
              }
          };

  return (
    <userContext.Provider value={{ ...state, reducer, registerUser, loginUser }}>
      {children}
    </userContext.Provider>
  );
};

export const userAuth = () => useContext(userContext);

export default Auths;

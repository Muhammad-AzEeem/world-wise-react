import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenicated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenicated: true };

    case "logout":
      return { ...state, use: null, isAuthenicated: false };

    default:
      throw new Error("Action not found");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenicated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
    else {
      alert("Email && Password is wrong");
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenicated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthPProvider ");
  return context;
}

export { AuthProvider, useAuth };

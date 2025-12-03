import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../url";

// Create the context and export it
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(null);

// Provider
export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${URL}/api/auth/refetch`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

import React, { useContext, useEffect, useState } from 'react';

const UserContext = React.createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const getUser = () => {
        const _token = JSON.parse(localStorage.getItem('token'));
        fetch('https://social-app-backend-edkz.onrender.com/user', {
            method: 'GET',
            headers: {'Authorization': `Bearer ${_token}`}
        }).then(res => res.json())
          .then(data => {
            if(data.user) {
                setUser(data.user);
                setToken(_token);
            }
          }).catch(err => {
            console.log(err);
          })
    }

    useEffect(() => {
       getUser();
    }, [])

    return <UserContext.Provider value={{
        user, 
        setUser,
        token,
        setToken
    }}>
        {
            children
        }
    </UserContext.Provider>
}

export const useUserContext = () => {
    return useContext(UserContext);
}

export default UserProvider;
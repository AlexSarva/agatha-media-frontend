import {createContext, useCallback, useMemo, useState} from 'react';
import auth from '../utils/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(window.localStorage.getItem('jwt'));
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')));

    const signup = useCallback(function (newUser, cb) {
        auth.register(newUser)
            .then((res) => {
                if (res.token) {
                    window.localStorage.setItem('user', JSON.stringify(res));
                    window.localStorage.setItem('jwt', res.token);
                    setUser(res);
                    setToken(res.token);
                }
            })
            .then(() => {
                cb();
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    const signin = useCallback(function (newUser, cb) {
        auth.authorize(newUser)
            .then((res) => {
                if (res.token) {
                    window.localStorage.setItem('user', JSON.stringify(res));
                    window.localStorage.setItem('jwt', res.token);
                    setUser(res);
                    setToken(res.token);
                }
            })
            .then(() => {
                cb();
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    const signout = useCallback( function (cb) {
        window.localStorage.removeItem('jwt');
        window.localStorage.removeItem('user');
        setUser(null);
        setToken(null);
        cb();
    }, [])

    const value = useMemo( () => ({
        user, token, signup, signin, signout
        }),
        [user, token, signup, signin, signout]
    );

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
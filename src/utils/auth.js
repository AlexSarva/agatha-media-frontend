class Auth {
    constructor() {
        this._baseUrl = 'http://80.66.158.182:2904';
        this._headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    register({username, email, password}) {
        return fetch(`${this._baseUrl}/api/user/register`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
            .then(this._checkResponse)
    }

    authorize({email, password}) {
        return fetch(`${this._baseUrl}/api/user/login`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(this._checkResponse)
    }

    checkToken(token) {
        return fetch(`${this._baseUrl}/api/users/me`, {
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`
            },
            method: 'GET',
        })
            .then(this._checkResponse)
    }
}

const auth = new Auth();
export default auth;
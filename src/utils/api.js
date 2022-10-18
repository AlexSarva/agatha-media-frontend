const apiConfig = {
    baseUrl: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
};

class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getGraphByURL(query) {
        return fetch(`${this._baseUrl}/api/graph/url`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                query: query,
            })
        })
            .then(this._checkResponse)
    }

    getSourceByURL(query) {
        return fetch(`${this._baseUrl}/api/source/url`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                query: query,
            })
        })
            .then(this._checkResponse)
    }

    getSourceByID(query) {
        return fetch(`${this._baseUrl}/api/source/id`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                query: query,
            })
        })
            .then(this._checkResponse)
    }

    getFullGraph() {
        return fetch(`${this._baseUrl}/api/graph`, {
            headers: this._headers,
            method: 'GET',
        })
            .then(this._checkResponse)
    }

    getGraphByID(query) {
        return fetch(`${this._baseUrl}/api/graph/id`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                query: query,
            })
        })
            .then(this._checkResponse)
    }

    getGraphByUUID(graph_id, token) {
        return fetch(`${this._baseUrl}/api/graph/uuid`, {
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify({
                graph_id: graph_id,
            })
        })
            .then(this._checkResponse)
    }

    getSearch(query) {
        return fetch(`${this._baseUrl}/api/search`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                text: query,
            })
        })
            .then(this._checkResponse)
    }

    addNewGraph({description, sources, uuid}, token) {
        return fetch(`${this._baseUrl}/api/graph/new`, {
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify({
                description: description,
                sources: sources,
                graph_id: uuid,
            })
        })
            .then(this._checkResponse)
    }

    getGraphCards(token) {
        return fetch(`${this._baseUrl}/api/graph/all`, {
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`
            },
            method: 'GET',
        })
            .then(this._checkResponse)
    }

    deleteGraphCard(graph_id, token) {
        return fetch(`${this._baseUrl}/api/graph/del`, {
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`
            },
            method: 'DELETE',
            body: JSON.stringify({
                graph_id: graph_id,
            })
        })
            .then(this._checkResponse)
    }

}

const api = new Api(apiConfig);
export default api;
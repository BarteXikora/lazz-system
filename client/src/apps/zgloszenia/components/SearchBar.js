import { useState, useContext } from 'react'
import AppContext from '../functions/AppContext'
import iconSearch from '../img/icon-search.png'

const SearchBar = () => {
    const { appState, appDispatch } = useContext(AppContext)

    const [search, setSearch] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        if (search)
            appDispatch({ type: 'UPDATE_FILTERS', payload: { search: search } })

        setSearch('')
    }

    return <form className="input-group" onSubmit={handleSubmit}>
        <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-control"
            type="text"
            placeholder="Szukaj zgłoszeń..."
        />

        <button className="btn btn-sec btn-icon-small" type="submit">
            <img src={iconSearch} alt="Szukaj!" />
        </button>
    </form>
}

export default SearchBar
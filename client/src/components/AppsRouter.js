import { Routes, Route } from 'react-router-dom'

const AppsRouter = ({ systemState }) => {
    return <>
        <Route path='/' element={<div className="container-xy section-gradient-s d-flex align-items-center justify-content-center">
            <h2 className='mb-5 pb-5'>Wybierz aplikację w <b>Docku!</b></h2>
        </div>} />

        {
            systemState.appsList.map(({ id, slug, component }) => {
                return (<Route
                    path={`/${slug}`}
                    element={component}
                    key={id}
                />)
            })
        }

        <Route path='*' element={'404'} />
    </>
}

export default AppsRouter
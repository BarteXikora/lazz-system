import { useState } from 'react'

import StepFormReady from './StepFormReady'

const StepAdjustable = () => {
    const _adjustableHeads = [
        { id: 0, name: 'LAZZ 068' },
        { id: 1, name: 'LAZZ 168' },
        { id: 2, name: 'LAZZ 268' },
        { id: 3, name: 'LAZZ 368' },
        { id: 4, name: 'LAZZ 468' },
        { id: 5, name: 'LAZZ 568' },
        { id: 6, name: 'LAZZ 668' },
        { id: 7, name: 'LAZZ 768' }
    ]

    const [selected, setSelected] = useState(-1)

    return <>
        <div className="row section-gray pt-4 pb-4 m-0">
            <div className="col-12 px-3">
                <h2 className="font-big fw-bold m-0 mt-2">Głowice regulowane:</h2>

                <p className="m-0">
                    Głowice regulowane wystepują w kilku gotowych wariantach. Można wybrać jeden z
                    nich poniżej i zapisać jego wycenę w aplikacji.
                </p>
            </div>
        </div>

        <div className="row pt-4 pb-4 m-0">
            <div className="col-12 px-3">
                <h2 className="font-big fw-bold m-0 mb-3 mt-2">Wybierz głowicę:</h2>

                {
                    _adjustableHeads.map((item, n) => <button
                        key={item.id}
                        className={`btn btn-item ${item.id === selected ? 'active' : ''} d-inline-block px-5 py-4 me-3 mb-2`}
                        onClick={() => setSelected(item.id)}
                    >
                        {item.name}
                    </button>)
                }
            </div>
        </div>

        {
            selected === -1 ?

                <div className="row pt-4 pb-4 m-0">
                    <div className="col-6 px-3">
                        <div className="info-box">
                            <h5 className="font-big fw-bold m-0">
                                Należy wybrać głowicę, abt przejść dalej...
                            </h5>
                        </div>
                    </div>
                </div>

                :

                <StepFormReady />
        }
    </>
}

export default StepAdjustable
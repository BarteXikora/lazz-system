import { useState, useEffect } from 'react'
import { PTNewCustomer, PTRegularCustomer } from './components/PriceTableInput'
import StepFormReady from './StepFormReady'

import iconSend from '../../../../img/icon-send.png'

const StepSendMail = ({ sectionGray = false }) => {
    const emptyForm = {
        newCustomer: {
            price: 0, discount: 0
        }, regularCustomer: {
            price: 0, discount: 0
        }
    }

    const [form, setForm] = useState(emptyForm)

    useEffect(() => {
        if (form.newCustomer.price < 0) setForm({ ...form, newCustomer: { ...form.newCustomer, price: 0 } })
        if (form.newCustomer.discount < 0) setForm({ ...form, newCustomer: { ...form.newCustomer, discount: 0 } })

        if (form.regularCustomer.price < 0) setForm({ ...form, regularCustomer: { ...form.regularCustomer, price: 0 } })
        if (form.regularCustomer.discount < 0) setForm({ ...form, regularCustomer: { ...form.regularCustomer, discount: 0 } })

    }, [form])

    return <>
        <div className={`row ${sectionGray ? 'section-gray' : ''} pt-4 pb-5 m-0`}>
            <div className="col-12 px-3">
                <h2 className="font-big fw-bold m-0 mt-2">Skontaktuj się z działem głowic:</h2>

                <p>
                    Ta głowica musi zostać wyceniona indywidualnie przez dział głowic.
                </p>

                <button className="btn btn-prim btn-icon-text mt-3">
                    <img src={iconSend} />

                    Skontaktuj się z działem głowic...
                </button>
            </div>
        </div>

        <div className={`row ${sectionGray ? '' : 'section-gray'} pt-4 pb-5 m-0`}>
            <div className="col-12 px-3">
                <h2 className="font-big fw-bold m-0 mt-2">Odpowiedź od działu głowic:</h2>

                <p>
                    Gdy otrzymasz odpowiedź od działu głowic możesz podać wycenę w formularzu
                    poniżej i dzięki temu zapisać wycenę w
                </p>
            </div>

            <div className="col-6 mt-3 px-3">
                <PTNewCustomer
                    price={form.newCustomer.price}
                    discount={form.newCustomer.discount}
                    setPrice={value => setForm({ ...form, newCustomer: { ...form.newCustomer, price: value } })}
                    setDiscount={value => setForm({ ...form, newCustomer: { ...form.newCustomer, discount: value } })}
                />
            </div>

            <div className="col-6 mt-3 px-3">
                <PTRegularCustomer
                    price={form.regularCustomer.price}
                    discount={form.regularCustomer.discount}
                    setPrice={value => setForm({ ...form, regularCustomer: { ...form.regularCustomer, price: value } })}
                    setDiscount={value => setForm({ ...form, regularCustomer: { ...form.regularCustomer, discount: value } })}
                />
            </div>
        </div>

        {
            !form.newCustomer.price && !form.regularCustomer.price ?

                <div className='row pt-4 pb-5 m-0'>
                    <div className="col-6 px-3">
                        <div className="info-box">
                            <h5 className="font-big fw-bold m-0">Należy podać przynajmniej jedną z cen, aby przejść dalej...</h5>
                        </div>
                    </div>
                </div>

                :

                <StepFormReady />
        }
    </>
}

export default StepSendMail
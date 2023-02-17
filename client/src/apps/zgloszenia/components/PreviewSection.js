import { useState, useEffect } from 'react'

const PreviewSection = ({ title, fields, hideEmptyFields }) => {
    const [anyField, setAnyField] = useState(1)

    useEffect(() => {
        const any = fields.filter(field => field.value)
        setAnyField(any.length)

    }, [fields])

    return <> {(anyField > 0 || !hideEmptyFields) && <section className="px-2 px-md-3 mb-5">
        <h2 className="section-title mb-4">{title}:</h2>

        <div className="row">
            {
                fields.map((field, n) => (field.value || !hideEmptyFields)
                    && <div
                        key={n}
                        className={`col-12 ${field.fullWidth ? '' : 'col-md-6 col-lg-12 col-xl-6'} px-3 mb-4`}
                    >

                        <b>{field.label}:</b> <br />

                        {field.value || <span className="fw-bold font-gray">[ brak wartości ]</span>}

                    </div>
                )
            }
        </div>
    </section>
    }
    </>
}

export default PreviewSection
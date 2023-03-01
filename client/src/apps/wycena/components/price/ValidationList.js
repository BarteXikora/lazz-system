import ValidationItem from './ValidationItem'

const ValidationList = () => {
    return <div className="px-3 pt-3 pb-5">
        <h2 className="font-big fw-bold mb-3">Lista pól do uzupełnienia:</h2>

        <ValidationItem
            number={1}
            section='Czas pracy'
            message='Czas wykonania projektu musi być większy od 0.'
        />

        <ValidationItem
            number={2}
            section='Czas pracy'
            message='Czas frezowania musi być większy od 0.'
        />

        <ValidationItem
            number={3}
            section='Wysyłka'
            message='Nie wybrano regionu wysyłki.'
        />
    </div>
}

export default ValidationList
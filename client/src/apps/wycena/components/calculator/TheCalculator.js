import SectionTimes from './SectionTimes'
import SectionShipment from './SectionShipment'
import SectionSpindles from './SectionSpindles'
import SectionBody from './SectionBody'
import SectionExtra from './SectionExtra'

const TheCalculator = () => {
    return <>
        <SectionTimes />

        <SectionShipment />

        <SectionSpindles />

        <SectionBody />

        <SectionExtra />

        <div className="my-5 py-5"></div>
    </>
}

export default TheCalculator
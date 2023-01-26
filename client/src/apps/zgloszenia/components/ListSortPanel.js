import ListSortSection from './ListSortSection'

const ListSortPanel = () => {
    return <section className="container-fluid sticky-top mt-4 px-3">
        <div className="row">
            <ListSortSection
                cols='2'
                text='Data:'
                isActive={false}
                isDesc={false}
                isEven={true}
                action={null}
            />

            <ListSortSection
                cols='4'
                text='Klient:'
                isActive={false}
                isDesc={false}
                isEven={false}
                action={null}
            />

            <ListSortSection
                cols='2'
                text='Dział:'
                isActive={false}
                isDesc={false}
                isEven={true}
                action={null}
            />

            <ListSortSection
                cols='3'
                text='Przekazano:'
                isActive={false}
                isDesc={false}
                isEven={false}
                action={null}
            />

            <ListSortSection
                cols='1'
                text='★'
                isActive={false}
                isDesc={false}
                isEven={true}
                action={null}
            />
        </div>
    </section>
}

export default ListSortPanel
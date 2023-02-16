const DevSizes = () => {
    return <div className="_sizes">
        <span className="_size d-sm-none">XS</span>
        <span className="_size d-none d-sm-flex d-md-none">SM</span>
        <span className="_size d-none d-md-flex d-lg-none">MD</span>
        <span className="_size d-none d-lg-flex d-xl-none">LG</span>
        <span className="_size d-none d-xl-flex">XL</span>
    </div>
}

export default DevSizes
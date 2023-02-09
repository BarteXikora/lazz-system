const printContact = (content) => {
    let newWindow = window.open('', '')
    newWindow.document.open()
    newWindow.document.write(
        '<html><head>' +
        '<link rel="stylesheet" href="css/main.css">' +
        '<title>Drukuj zgłoszenie</title>' +
        '</head><body onload="window.print()">' +
        '<div class="col-12"><h1>Zgłoszenie z formularza na stronie Lazzoni Group:</h1></div>' +
        content.outerHTML || new XMLSerializer().serializeToString(content) +
        '</body></html>'
    )
    newWindow.document.close()
    setTimeout(() => { newWindow.close() }, 200)
}

export default printContact
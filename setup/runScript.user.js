window.addEventListener('message', (e) => {
    if (e.data.name !== 'runScript' ) return 
    eval(e.data.s.contentScript)
})
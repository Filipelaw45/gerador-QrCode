const inputLink = document.getElementById('link-input')
const btnSubmit = document.getElementById('btn-submit')
const printContent = document.querySelector('.print-content')

let form = document.querySelector('form') 

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(!inputLink.value) return

    genQrCode()
    form.reset()
})

function genQrCode(){
    printContent.innerHTML = ''
    let islink = isLink(inputLink.value)
    let link = createLink(islink, inputLink.value)
    createQrCode(inputLink.value, link)
    createBtnPrint()
}

function createQrCode(QrcodeContent, link){
    let qrCode = document.createElement('img')
    qrCode.setAttribute('src', '')
    qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${QrcodeContent}`
    link.appendChild(qrCode)
}

function createBtnPrint(){
    let print = document.createElement('button')
    print.classList.add('btn-print')
    print.innerHTML = 'Imprimir'
    print.onclick = ()=> window.print()
    printContent.appendChild(print)
}

function createLink(isLink, urlString){
    let link = document.createElement('a')
    link.setAttribute('target', '_blank')
    link.classList.add('print')
    isLink ? link.setAttribute('href', urlString) : null
    printContent.appendChild(link)
    return link
}

function isLink(urlString){
    try{
        let url = new URL(urlString)
        return true
    }catch(erro){
        return false
    }
}
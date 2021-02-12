
var nome = document.getElementById('name');
var email = document.getElementById('email');
var phone1 = document.getElementById('phone1');
var phone2 = document.getElementById('phone2');
var insertNome = document.getElementById("insertName");
var insertEmail = document.getElementById("insertEmail");
var insertPhone1 = document.getElementById("insertPhone1")
var insertPhone2 = document.getElementById("insertPhone2")

async function imagens() {
    const resp =  await fetch('https://picsum.photos/v2/list', { method: 'GET' })
    const data = await resp.json();
    await slide()
 
    return(data)
}
imagens().then((resp)=>{
            
        resp.forEach((item =>{
            var li = document.createElement("LI");
            li.className = "carousel__slide";
            li.innerHTML = `<img class="carousel__image" src="${item.url}" alt="">`
            document.querySelector(".carousel__track").appendChild(li) 
        })) 
})   
    

nome.addEventListener("focus", () => {
    document.getElementById('nomeFeedback').innerText = ""
});
email.addEventListener("focus", () => {
    document.getElementById('emailFeedback').innerText = ""
});
phone1.addEventListener("focus", () => {
    document.getElementById('phone1Feedback').innerText = ""
});
    


const enviar = () => {
    if(!nome.value){
        document.getElementById('nomeFeedback').innerText = 'Preencha o campo nome corretamente'
    }

    if(!phone1.value){
        document.getElementById('phone1Feedback').innerText = 'Preencha o campo telefone corretamente'
    }

    const valEmail = validacaoEmail(email)

    const valPhone = validacaoPhone(phone1.value)


    if(valEmail == false){
        document.getElementById('emailFeedback').innerText = 'Email inválido'
    } if(valPhone == false){
        document.getElementById('phone1Feedback').innerText = 'telefone inválido'
    }
   
    if(nome.value &&  valEmail == true && valPhone == true){
    insertNome.innerText = nome.value;
    insertEmail.innerText = email.value;
    insertPhone1.innerText = phone1.value;

    if(phone2.value == ""){
        
        insertPhone2.innerText = 'Não informado';
        insertPhone2.classList.add('cinza')
    }else{
        insertPhone2.innerText = phone2.value;
    }
    document.querySelector('#alerta').classList.remove('display-none')
    document.querySelector('.mensagem-ficha').classList.add('display-none');
    document.querySelector('.dados-cadastrados').classList.remove('display-none')

    setTimeout(() => {
        document.querySelector('#alerta').classList.add('display-none')
    }, 2000);
    }
    

}

function validacaoEmail(field) {
    usuario = field.value.substring(0, field.value.indexOf("@"));
    dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);
    
    if ((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
  
   
    return(true)
    }
    else{
      
    return(false)   
    
    }
}
function validacaoPhone(field){

    var RegExp = /(\(\d{2}\)\s)(\d{4,5}\-\d{3,4})/g;
    var telefone = field;
    const validar = RegExp.test(telefone); 

    return(validar)
}

phone1.addEventListener("keypress", maskTel);
function maskTel(){
  
    const str = phone1.value
    const newStr = str.replace(/(\d{2})(\d{4})(\d{3,4})/g, "($1) $2-$3");
    phone1.value = newStr

}

phone2.addEventListener("keypress", maskTel2);
function maskTel2(){
    
    const str = phone2.value

    const newStr = str.replace(/(\d{2})(\d{4})(\d{3,4})/g, "($1) $2-$3");
    phone2.value = newStr

}

    
function slide(){
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButon = document.querySelector('.carousel__button--right');
const prevButon = document.querySelector('.carousel__button--left')

const slideWidth = slides[0].getBoundingClientRect().width/2;

slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px'
});
prevButon.addEventListener('click', e =>{
    const currentSlide = track.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling
    const amountToMove = prevSlide.style.left;
    track.style.transform = 'translateX(-'+ amountToMove +')'
    currentSlide.classList.remove('current-slide')
    prevSlide.classList.add('current-slide')
})

nextButon.addEventListener('click', e =>{
    const currentSlide = track.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling
    const amountToMove = nextSlide.style.left;
    track.style.transform = 'translateX(-'+ amountToMove +')'
    currentSlide.classList.remove('current-slide')
    nextSlide.classList.add('current-slide')
})
}





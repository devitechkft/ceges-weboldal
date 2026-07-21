const buttons=document.querySelectorAll(".language-switcher button");

async function loadLanguage(lang){

    const response=await fetch(`lang/${lang}.json`);
    const dict=await response.json();

    document.documentElement.lang=lang;

    document.querySelectorAll("[data-i18n]").forEach(el=>{

        const key=el.dataset.i18n;

        if(dict[key]){

            el.innerHTML=dict[key].replace(/\n/g,"<br>");

        }

    });

    buttons.forEach(b=>b.classList.remove("active"));

    document.querySelector(`[data-lang="${lang}"]`).classList.add("active");

    localStorage.setItem("language",lang);

}

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        loadLanguage(button.dataset.lang);

    });

});

const stored=localStorage.getItem("language");

if(stored){

    loadLanguage(stored);

}else{

    const browser=navigator.language.startsWith("hu")?"hu":"en";

    loadLanguage(browser);

}

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

// odświeżanie gry
let game

// kolory
const siatka="#c3c4cf" // jasny szary
const tlo="#333333" // ciemny szary
const nieruchomy="#477136" // zielony
const pink="#e83e8c"
const orange="#fd7e14"
const green="#73a839"
const gray="#868e96"
const cyan="#2fa4e7"
const primary="#2fa4e7" // to to asmo co wyżej
const secondary="#e9ecef" // biały prawie
const red="#c71c22"
const purple="#6f42c1"
const yellow="#dd5600"
// nie używanie, ale fajne
const blue="#033c73"
const indigo="#6610f2"
const teal="#20c997"
const white="#fff"
const gray_dark="#343a40"

// skala kratek (w px)
const skala=40

// kymiary w kratkach
const kx=10
const ky=20

// odstęp
const margin=2

// początek
const pocz=margin*skala

// wymiary w pikselach
const wx=kx*skala
const wy=ky*skala

// koniec
const kony=wy+pocz
const konx=wx+pocz

// info do 2. ramki
let wynik=0
let linie=0
let poziom=prompt("Wybierz poziom od 1 do 10")||1

// tablica z aktualnym i następnym blokiem
let nastepny=[]

// szybkość odświerzania
let speed=1000-100*poziom

// zlicza ile lini zrobiliśmy od zwiększenia prędkośći
let licznik=0

// tablica z blokami
let kwadrat=[]

// numer bloku
let numer=0

// pokazuje kratki w głównej ramce (nie używane)
const kratki = () => {
    // poziomo
    for(let y = pocz; y < kony; y+=skala){
        ctx.beginPath();
        ctx.moveTo(pocz, y);
        ctx.lineTo(konx, y)
        ctx.lineWidth = 1

        ctx.strokeStyle = siatka;
        ctx.stroke();
    }
    // pionowo
    for(let x = pocz; x < konx; x+=skala){
        ctx.beginPath();
        ctx.moveTo(x, pocz);
        ctx.lineTo(x, kony)

        ctx.strokeStyle = siatka;
        ctx.stroke();
    }
}

// rysuje główną ramkę
const ramka = () =>{
            ctx.beginPath()
            ctx.rect(margin*skala,margin*skala,kx*skala,ky*skala)
            ctx.strokeStyle = siatka;
            ctx.stroke();
        }

// rysuje ramkę z następnym blokiem
const ramka_block = () =>{
    const bx=margin*skala+kx*skala+skala
    const by=margin*skala
    const rozmiar=7*skala

    ctx.beginPath()
    ctx.rect(bx,by,rozmiar,rozmiar)
    ctx.stroke();

    ctx.font = `${(skala/4)*3}px Consolas`;
    ctx.fillStyle = pink;
    ctx.textAlign = "center";
    ctx.fillText(`Następny blok:`, bx+rozmiar/2, by+skala);
    nastepny[1].poka(true)
}

const ramka_2 = () =>{
    const rx=margin*skala+kx*skala+skala
    const ry=margin*skala+8*skala
    const rozmiar=7*skala

    ctx.beginPath()
    ctx.rect(rx,ry,rozmiar,rozmiar)
    ctx.stroke()

    ctx.fillStyle = pink;
    ctx.fillText(`Wynik: ${wynik}`, rx+rozmiar/2, ry+skala);
    ctx.fillStyle = orange;
    ctx.fillText(`Linie: ${linie}`, rx+rozmiar/2, ry+3.5*skala);
    ctx.fillStyle = green;
    ctx.fillText(`Poziom: ${poziom}`, rx+rozmiar/2, ry+6*skala);
}

// wymalowywuje interfejs
const malowanie = () =>{
    ctx.fillStyle = tlo
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ramka()
    ramka_block()
    ramka_2()
}

// tablica z planszą
let tab=new Array(ky+1)
for (let i=0;i<tab.length;i++)
    (i==tab.length-1)?tab[i]=[1,1,1,1,1,1,1,1,1,1,]:tab[i]=[0,0,0,0,0,0,0,0,0,0]

// wyświelta nieruchome bloki
const wyswietl=()=>{
    ctx.beginPath()
    ctx.fillStyle=nieruchomy

    tab.forEach((e1,y) => {
        e1.forEach((e2,x) => {
            if(e2==1 && y<20)
                ctx.fillRect((x+2)*skala,(y+2)*skala,skala,skala)
        })  
    })
}

// kasuje pełne linie
const kasuj=()=>{
    let suma
    let pelne=[]

    // szuka pełne linie
    tab.forEach((e1,i) => {
        suma=0
        if(i<20)
            e1.forEach(e2 => {
                if(e2==1) suma++
            })  
        if(suma==10) pelne.push(i)
    })

    pelne.reverse()

    // przesuwany w dół wszystkie linie od pustych lini tyle razy ile jest pustych lini
    pelne.forEach((e1,i) => {
        for(let j=e1+i;j>0;j--){
            tab[j].forEach((e,index) => {
                tab[j][index]=tab[j-1][index]
            })  
        }
    })
    
    // zmienia info w 2. ramce
    wynik+=pelne.length*pelne.length*100
    linie+=pelne.length
    licznik+=pelne.length
    let prog=1

    // przyśpiesza grę
    if(licznik>=prog){
        licznik-=prog*Math.floor(licznik/prog)
        speed-=100
        poziom++
        clearInterval(game)
        startGame()
    }
}

// losuje następny blok
const next=()=>{
    const los=Math.floor(Math.random()*7)
    switch (los) {
        case 0:
            return new I
            break;
    
        case 1:
            return new J
            break;
    
        case 2:
            return new L
            break;
    
        case 3:
            return new O
            break;
    
        case 4:
            return new Z
            break;
    
        case 5:
            return new T
            break;
    
        case 6:
            return new S
            break;
    
        default:
            return new O
            break;
    }
}

// wzór wszystkich boloków
class Ksztalt{
    srodek=0
    
    // kształt bloku
    uklad=[]

    // pozycja bloku w px (dla canvasa)
    x=(wx)/2+pocz//0 // (wx-this.rozmiar)/2+pocz
    y=pocz

    // pozycja bloku w liczba całkowitych od 0 do 19 (dla tablicy)
    liczx=()=>(this.x-pocz)/skala
    liczy=()=>(this.y-pocz)/skala
    
    // czy się porusza i wyświetla
    ruch=1
    
    // wyświetla blok
    poka(okno){
        ctx.beginPath()
        ctx.fillStyle=this.color
        this.uklad.forEach((e1,i,a1) => {
            e1.forEach((e2,j,a2) => {
                // w ramce następnego bloku
                if(okno){
                    if(e2==1 && this.ruch)
                        ctx.fillRect(this.x+(j-this.srodek+9)*skala,this.y+(i-this.srodek+3)*skala,skala,skala)
                // na planszy
                }else{
                    if(e2==1 && this.ruch)
                        ctx.fillRect(this.x+(j-this.srodek)*skala,this.y+(i-this.srodek)*skala,skala,skala)
                    }
            })
        })
       wyswietl()
    }

    // idzie w dół
    idz(){
        if(this.ruch) this.poka()
        if(this.ruch) this.y+=skala
        setTimeout(()=>this.koniec(),300)
    }

    // sprawdza czy blok ma przeszkodę po lewej, prawej lub na dole
    sprawdz(x,y){
        let a=0
        this.uklad.forEach((e1,i,a1) => {
            e1.forEach((e2,j,a2) => {
                if(e2==1)
                    if(tab[this.liczy()+i-this.srodek+y][this.liczx()+j-this.srodek+x])
                        a=1
            })
        })
        return a
    }

    // sprawdza czy blok może dalej iść, jeśli nie może to staje się nieruchomy
    koniec(){
        if(this.sprawdz(0,1)){
            
            this.uklad.forEach((e1,i,a1) => {
                e1.forEach((e2,j,a2) => {
                    if(e2==1 && this.ruch)
                    tab[this.liczy()+i-this.srodek][this.liczx()+j-this.srodek]=1                
                })
            })
            this.ruch=0
    
            // dodaje następny blok i kasuje pełne linie
            if(!kwadrat[numer].ruch){
                numer++
                nastepny[0]=nastepny[1]
                nastepny[1]=next()
                kwadrat.push(nastepny[0])
                kasuj()
            }

            // czasami kończy grę jak nie ma miejsca
            if(this.y<=pocz+skala){
                clearInterval(game)
                alert("Koniec gry!")
            }
            return 0
        }
        return 1
    }

    // porusza się w lewo
    left(){
        // sprawdza czy ma jakieś swoje części od środka w lewo
        let l=this.srodek
        this.uklad.forEach((e,index)=>{
            for(let i=0;i<this.srodek;i++)
                if(e[i] && i<l) l=i
        })
        l=this.srodek-l
        if(this.x-l*skala>pocz && !this.sprawdz(-1,0))this.x-=skala
        this.koniec()
    }

    // porusza się w prawo
    right(){
        // sprawdza czy ma jakieś swoje części od środka w prawo
        let l=this.srodek
        this.uklad.forEach((e,index)=>{
            for(let i=e.length;i>this.srodek;i--)
                if(e[i] && i>l) l=i
        })
        l=l-this.srodek-1
        if(this.x+l*skala<wx && !this.sprawdz(1,0))this.x+=skala
        this.koniec()
    }

    // idze w dół
    down(){
        if(this.koniec()) this.y+=skala
        this.koniec()
    }

    // robi fiflaka
    up(){
        // jakiś niepoważny warunek sprawdza czy blok ma miejsce
        if(this.koniec() && !tab[this.liczy()][this.liczx()-1] && !tab[this.liczy()][this.liczx()+1] && !(this.liczx()==0 || this.liczx()==9)){

            // potężny algorytm z internetu do obracania tablicy
            let tmp;
            let n=this.uklad.length
            this.pozycja=!this.pozycja
            for(let i=0;i<n/2;i++){
                for (let j=i;j<n-i-1;j++){
                    tmp             = this.uklad[i][j];
                    this.uklad[i][j]         = this.uklad[j][n-i-1];
                    this.uklad[j][n-i-1]     = this.uklad[n-i-1][n-j-1];
                    this.uklad[n-i-1][n-j-1] = this.uklad[n-j-1][i];
                    this.uklad[n-j-1][i]     = tmp;
                }
            }
        }
        this.poka()
        this.koniec()
    }
}

// wszystkie bloki
class I extends Ksztalt{
    srodek=2
    uklad=[
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
    ]
    y=pocz+skala
    color=gray
}

class J extends Ksztalt{
    srodek=1
    uklad=[
        [0,1,0],
        [0,1,0],
        [1,1,0],
    ]
    y=pocz+skala
    color=cyan
}

class L extends Ksztalt{
    srodek=1
    uklad=[
        [0,1,0],
        [0,1,0],
        [0,1,1],
    ]
    y=pocz+skala
    color=orange
}

class O extends Ksztalt{
    uklad=[
        [1,1],
        [1,1],
    ]
    color=secondary
}
    
class Z extends Ksztalt{
    srodek=1
    uklad=[
        [0,0,0],
        [1,1,0],
        [0,1,1],
    ]
    color=red
}

class T extends Ksztalt{
    srodek=1
    uklad=[
        [0,0,0],
        [1,1,1],
        [0,1,0],
    ]
    color=purple
}

class S extends Ksztalt{
    srodek=1
    uklad=[
        [0,0,0],
        [0,1,1],
        [1,1,0],
    ]
    color=green
}

class Test extends Ksztalt{
    srodek=1
    uklad=[
        [1,0,1,0,0,0,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,0,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
    ]
    color=blue
}

nastepny[0]=next()
nastepny[1]=next()

kwadrat.push(nastepny[0])

malowanie()


// rozpoczynanie gry
const startGame=()=>{
    game=setInterval(()=>{
        malowanie()
        kwadrat.forEach(e=>e.idz())
    },speed)
}

// wyświetlanie interfesuj i bloku podczas przemieszczania się bloku
const update=()=>{
    malowanie()
    kwadrat.forEach(e=>e.poka())
}

// nasłuchiwanie strzałek i ruszanie aktywanym blokiem
window.addEventListener("keydown", (e)=>{
    switch (e.key) {
        case "ArrowLeft":
            kwadrat[numer].left()
            update()
            break;
    
        case "ArrowRight":
            kwadrat[numer].right()
            update()
            break;

        case "ArrowDown":
            kwadrat[numer].down()
            update()
            break;
            break;

        case "ArrowUp":
            kwadrat[numer].up()
            update()
            break;
        
        case "x":
            nastepny[1]=new Test()
            break;
        default:
            break;
    }
})
startGame()
# Laboration 5.2 i kursen DT084G, Introduktion till programmering i JavaScript

## 📝 Uppgift

Publicera en webbapplikation med HTML, CSS och JavaScript på tre olika plattformar och skriva en rapport.  
I denna README.md läggs fokus på att beskriva applikationen och ett problem som uppstod i webbläsaren Firefox.

## 💻 Applikationsflöde

* Skärm (320–600 px)

    * Användaren kan bestämma vilken bild som ska synas  
    * Användaren ser vilken bild som visas (Images: 1/4)  
    * Användaren kan trycka på hamburgarikonen för att visa navigering  
    * Användaren kan stänga navigeringen  

* Surfplatta och dator

    * Visar vald bild i större format  

* Mobil, surfplatta och dator

    * Användaren kan öka och minska antalet av den produkt som ska läggas i varukorgen  
    * Användaren kan lägga till valfritt antal av produkten i varukorgen  
    * Användaren kan öppna och stänga varukorgen  
    * Användaren kan radera varukorgens innehåll  
    * Visar tom varukorg eller varukorg med vara och pris

## ✅ Använd teknik & ikonbibliotek

* HTML  
* CSS  
* Media queries  
* JavaScript  
* Mobile first (start: 320 px)  
* Font Awesome  

## 🤔 Problem

För skärmar med en bredd på 600 px eller mindre uppstod ett problem med image-slidern.  
Endast en bild ska visas åt gången, men i Firefox visades istället alla bilder efter varandra.  
Problemet berodde på att bilderna krympte i containern. Det löstes genom att använda egenskapen **flex-shrink** 👇

```html
            <div id="images-wrapper">
                <div id="images-container">
                    <img src="images/sneakers-product-image-1.webp" alt="White and light brown sneakers">
                    <img src="images/sneakers-product-image-2.webp" alt="White and light brown sneakers">
                    <img src="images/sneakers-product-image-3.webp" alt="White and light brown sneakers">
                    <img src="images/sneakers-product-image-4.webp" alt="White and light brown sneakers">
                </div>
                <!--Arrows for smaller screens - slide images when clicked-->
                <div id="arrows-slider">
                    <span id="slide-left">&lt;</span><span id="slide-right">&gt;</span>
                </div>
                <div id="show-current-img">
                    Image:<span id="current-img">1</span>/<span>4</span>
                </div>
            </div>
```

```css
#images-container {
    display: flex;
    width: 100%;
    transition: transform 0.4s ease;
}

#images-container > img {
    width: 100%;
    flex-shrink: 0;
}
```

## 🟡 Klona repo

```bash
git clone https://github.com/izab2500/lab5_2js.git


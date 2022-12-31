# Olas farm

Projekt k bakalárskej práci Interaktívne hry pre deti v OpenLabe

Pre simulovanie ale aj používanie hry v OpenLabe je potrebné byť pripojený na univerzitnú sieť alebo cez VPN.

Táto systémová príručka poskytuje informácie k zdrojovému kódu nášho projektu. V nasledujúcich sekciách sa dozviete ako je náš projekt členený v priečinkoch a tiež, ktoré sú hlavnú funkcie nášho projektu.

## Členenie priečinkov v projekte 
V tejto sekcií sa dozviete Členenie priečinkov. Koreňový priečinok obsahuje:

    * animals   - priečinok obsahujúci HTML súbory k levelu Stodola
    *  css   - priečinok obsahujúci CSS súbory
    *  img   - priečinok obsahujúci obrázky
    *  kitchen   - priečinok obsahujúci HTML súbory k levelu Kuchyňa
    *  scripts   - priečinok obsahujúci JavaScript súbory
    *  wool   - priečinok obsahujúci HTML súbory k levelu Dielňa
    *  index.html   
    *  start_1.html 
    *  start_2.html 
    *  start_3.html 
    *  start_4.html 
    *  start_5.html 
    *  start.html 


Ako môžeme vidieť vyššie levely sú priečinky a v každý z nich sa ďalej člení takto:

    *  level1_1.html 
    *  level1_2.html 
    *  level1_3.html 
    *  level1_4.html 
    *  level1_5.html 
    *  level1.html 


HTML súbory, ktoré končia _1 až _5 sú súbory pre jednotlivé bočné obrazovky podľa číslovania. 

V priečinku scripts sa nachádzajú nasledujúce súbory:

    *  index.js
    *  level_animals.js 
    *  level_kitchen.js 
    *  level_wool.js 
    *  screen_main.js 
    *  screen1.js 
    *  screen2.js 
    *  screen3.js 
    *  screen4.js 
    *  screen5.js  
    *  start.js


Súbory s názvom screen obsluhujú obrazovky na základe správ z MQTT protokolu. 

## Hlavné funkcie projektu}


Funkcia *function onMessageArrived(message)*  je hlavná funkcia nášho projektu na základe destinácie a obsahu správy sa rozhodne, akú level alebo, ktorú funkciu levelu spustí. 
Nakoľko používame pre riadenie obrazoviek jednotlivé JavaScript súbory v súbore *level_[názov levelu].js* je potrebné posielať správu na topic "OlasFarm/actualLevel" o aktuálne leveli. Správa o aktuálnom leveli zabezpečuje to, že po prijatí spravy sa vykoná správna časť levelu.

Sledovanie polohy je riešené tiež vo funkcií  *onMessageArrived()* ak je destinácia správy "openlab/mapPositions/9", tak každý ovládač obrazovky (screen[číslo obrazovky].js) zisťuje, či sa dieťa nachádza pred danou obrazovkou. Následne po šiestich sekundách zavolá funkciu  *control()*, v ktorej sa podľa aktuálneho levelu posielajú správy o nájdení predmetu alebo spusteniu levela. Pre simuláciu sledovania polohy, je potrebné v ovládačoch obrazoviek v časti, kde sa prihlasujeme na odber správ z topicov, zakomentovať zmenu obsahu premmenej *map*. Následne na [tejto stránke](https://openlab.kpi.fei.tuke.sk/simulator/map/xx123yy) môžme simulovať polohy v OpenLabe. 


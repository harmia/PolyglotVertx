/**
 * Created with IntelliJ IDEA.
 * User: harmia
 * Date: 27.6.2013
 * Time: 13:13
 * Copyright (C) 2013 Juhana "harmia" Harmanen
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
package webapp

def eb = vertx.eventBus

def pa = 'vertx.mongopersistor'

def municipalities = [
        [
                'name': 'Alajärvi'
        ],
        [
                'name': 'Alavieska'
        ],
        [
                'name': 'Alavus'
        ],
        [
                'name': 'Asikkala'
        ],
        [
                'name': 'Askola'
        ],
        [
                'name': 'Aura'
        ],
        [
                'name': 'Brändö'
        ],
        [
                'name': 'Eckerö'
        ],
        [
                'name': 'Enonkoski'
        ],
        [
                'name': 'Enontekiö'
        ],
        [
                'name': 'Espoo'
        ],
        [
                'name': 'Eura'
        ],
        [
                'name': 'Eurajoki'
        ],
        [
                'name': 'Evijärvi'
        ],
        [
                'name': 'Finström'
        ],
        [
                'name': 'Forssa'
        ],
        [
                'name': 'Föglö'
        ],
        [
                'name': 'Geta'
        ],
        [
                'name': 'Haapajärvi'
        ],
        [
                'name': 'Haapavesi'
        ],
        [
                'name': 'Hailuoto'
        ],
        [
                'name': 'Halsua'
        ],
        [
                'name': 'Hamina'
        ],
        [
                'name': 'Hammarland'
        ],
        [
                'name': 'Hankasalmi'
        ],
        [
                'name': 'Hanko'
        ],
        [
                'name': 'Harjavalta'
        ],
        [
                'name': 'Hartola'
        ],
        [
                'name': 'Hattula'
        ],
        [
                'name': 'Hausjärvi'
        ],
        [
                'name': 'Heinola'
        ],
        [
                'name': 'Heinävesi'
        ],
        [
                'name': 'Helsinki'
        ],
        [
                'name': 'Hirvensalmi'
        ],
        [
                'name': 'Hollola'
        ],
        [
                'name': 'Honkajoki'
        ],
        [
                'name': 'Huittinen'
        ],
        [
                'name': 'Humppila'
        ],
        [
                'name': 'Hyrynsalmi'
        ],
        [
                'name': 'Hyvinkää'
        ],
        [
                'name': 'Hämeenkoski'
        ],
        [
                'name': 'Hämeenkyrö'
        ],
        [
                'name': 'Hämeenlinna'
        ],
        [
                'name': 'Ii'
        ],
        [
                'name': 'Iisalmi'
        ],
        [
                'name': 'Iitti'
        ],
        [
                'name': 'Ikaalinen'
        ],
        [
                'name': 'Ilmajoki'
        ],
        [
                'name': 'Ilomantsi'
        ],
        [
                'name': 'Imatra'
        ],
        [
                'name': 'Inari'
        ],
        [
                'name': 'Inkoo'
        ],
        [
                'name': 'Isojoki'
        ],
        [
                'name': 'Isokyrö'
        ],
        [
                'name': 'Jalasjärvi'
        ],
        [
                'name': 'Janakkala'
        ],
        [
                'name': 'Joensuu'
        ],
        [
                'name': 'Jokioinen'
        ],
        [
                'name': 'Jomala'
        ],
        [
                'name': 'Joroinen'
        ],
        [
                'name': 'Joutsa'
        ],
        [
                'name': 'Juankoski'
        ],
        [
                'name': 'Juuka'
        ],
        [
                'name': 'Juupajoki'
        ],
        [
                'name': 'Juva'
        ],
        [
                'name': 'Jyväskylä'
        ],
        [
                'name': 'Jämijärvi'
        ],
        [
                'name': 'Jämsä'
        ],
        [
                'name': 'Järvenpää'
        ],
        [
                'name': 'Kaarina'
        ],
        [
                'name': 'Kaavi'
        ],
        [
                'name': 'Kajaani'
        ],
        [
                'name': 'Kalajoki'
        ],
        [
                'name': 'Kangasala'
        ],
        [
                'name': 'Kangasniemi'
        ],
        [
                'name': 'Kankaanpää'
        ],
        [
                'name': 'Kannonkoski'
        ],
        [
                'name': 'Kannus'
        ],
        [
                'name': 'Karijoki'
        ],
        [
                'name': 'Karkkila'
        ],
        [
                'name': 'Karstula'
        ],
        [
                'name': 'Karvia'
        ],
        [
                'name': 'Kaskinen'
        ],
        [
                'name': 'Kauhajoki'
        ],
        [
                'name': 'Kauhava'
        ],
        [
                'name': 'Kauniainen'
        ],
        [
                'name': 'Kaustinen'
        ],
        [
                'name': 'Keitele'
        ],
        [
                'name': 'Kemi'
        ],
        [
                'name': 'Kemijärvi'
        ],
        [
                'name': 'Keminmaa'
        ],
        [
                'name': 'Kemiönsaari'
        ],
        [
                'name': 'Kempele'
        ],
        [
                'name': 'Kerava'
        ],
        [
                'name': 'Keuruu'
        ],
        [
                'name': 'Kihniö'
        ],
        [
                'name': 'Kinnula'
        ],
        [
                'name': 'Kirkkonummi'
        ],
        [
                'name': 'Kitee'
        ],
        [
                'name': 'Kittilä'
        ],
        [
                'name': 'Kiuruvesi'
        ],
        [
                'name': 'Kivijärvi'
        ],
        [
                'name': 'Kokemäki'
        ],
        [
                'name': 'Kokkola'
        ],
        [
                'name': 'Kolari'
        ],
        [
                'name': 'Konnevesi'
        ],
        [
                'name': 'Kontiolahti'
        ],
        [
                'name': 'Korsnäs'
        ],
        [
                'name': 'Koski Tl'
        ],
        [
                'name': 'Kotka'
        ],
        [
                'name': 'Kouvola'
        ],
        [
                'name': 'Kristiinankaupunki'
        ],
        [
                'name': 'Kruunupyy'
        ],
        [
                'name': 'Kuhmo'
        ],
        [
                'name': 'Kuhmoinen'
        ],
        [
                'name': 'Kumlinge'
        ],
        [
                'name': 'Kuopio'
        ],
        [
                'name': 'Kuortane'
        ],
        [
                'name': 'Kurikka'
        ],
        [
                'name': 'Kustavi'
        ],
        [
                'name': 'Kuusamo'
        ],
        [
                'name': 'Kyyjärvi'
        ],
        [
                'name': 'Kärkölä'
        ],
        [
                'name': 'Kärsämäki'
        ],
        [
                'name': 'Kökar'
        ],
        [
                'name': 'Köyliö'
        ],
        [
                'name': 'Lahti'
        ],
        [
                'name': 'Laihia'
        ],
        [
                'name': 'Laitila'
        ],
        [
                'name': 'Lapinjärvi'
        ],
        [
                'name': 'Lapinlahti'
        ],
        [
                'name': 'Lappajärvi'
        ],
        [
                'name': 'Lappeenranta'
        ],
        [
                'name': 'Lapua'
        ],
        [
                'name': 'Laukaa'
        ],
        [
                'name': 'Lavia'
        ],
        [
                'name': 'Lemi'
        ],
        [
                'name': 'Lemland'
        ],
        [
                'name': 'Lempäälä'
        ],
        [
                'name': 'Leppävirta'
        ],
        [
                'name': 'Lestijärvi'
        ],
        [
                'name': 'Lieksa'
        ],
        [
                'name': 'Lieto'
        ],
        [
                'name': 'Liminka'
        ],
        [
                'name': 'Liperi'
        ],
        [
                'name': 'Lohja'
        ],
        [
                'name': 'Loimaa'
        ],
        [
                'name': 'Loppi'
        ],
        [
                'name': 'Loviisa'
        ],
        [
                'name': 'Luhanka'
        ],
        [
                'name': 'Lumijoki'
        ],
        [
                'name': 'Lumparland'
        ],
        [
                'name': 'Luoto'
        ],
        [
                'name': 'Luumäki'
        ],
        [
                'name': 'Luvia'
        ],
        [
                'name': 'Maalahti'
        ],
        [
                'name': 'Maaninka'
        ],
        [
                'name': 'Maarianhamina'
        ],
        [
                'name': 'Marttila'
        ],
        [
                'name': 'Masku'
        ],
        [
                'name': 'Merijärvi'
        ],
        [
                'name': 'Merikarvia'
        ],
        [
                'name': 'Miehikkälä'
        ],
        [
                'name': 'Mikkeli'
        ],
        [
                'name': 'Muhos'
        ],
        [
                'name': 'Multia'
        ],
        [
                'name': 'Muonio'
        ],
        [
                'name': 'Mustasaari'
        ],
        [
                'name': 'Muurame'
        ],
        [
                'name': 'Mynämäki'
        ],
        [
                'name': 'Myrskylä'
        ],
        [
                'name': 'Mäntsälä'
        ],
        [
                'name': 'Mänttä-Vilppula'
        ],
        [
                'name': 'Mäntyharju'
        ],
        [
                'name': 'Naantali'
        ],
        [
                'name': 'Nakkila'
        ],
        [
                'name': 'Nastola'
        ],
        [
                'name': 'Nivala'
        ],
        [
                'name': 'Nokia'
        ],
        [
                'name': 'Nousiainen'
        ],
        [
                'name': 'Nurmes'
        ],
        [
                'name': 'Nurmijärvi'
        ],
        [
                'name': 'Närpiö'
        ],
        [
                'name': 'Orimattila'
        ],
        [
                'name': 'Oripää'
        ],
        [
                'name': 'Orivesi'
        ],
        [
                'name': 'Oulainen'
        ],
        [
                'name': 'Oulu'
        ],
        [
                'name': 'Outokumpu'
        ],
        [
                'name': 'Padasjoki'
        ],
        [
                'name': 'Paimio'
        ],
        [
                'name': 'Paltamo'
        ],
        [
                'name': 'Parainen'
        ],
        [
                'name': 'Parikkala'
        ],
        [
                'name': 'Parkano'
        ],
        [
                'name': 'Pedersören kunta'
        ],
        [
                'name': 'Pelkosenniemi'
        ],
        [
                'name': 'Pello'
        ],
        [
                'name': 'Perho'
        ],
        [
                'name': 'Pertunmaa'
        ],
        [
                'name': 'Petäjävesi'
        ],
        [
                'name': 'Pieksämäki'
        ],
        [
                'name': 'Pielavesi'
        ],
        [
                'name': 'Pietarsaari'
        ],
        [
                'name': 'Pihtipudas'
        ],
        [
                'name': 'Pirkkala'
        ],
        [
                'name': 'Polvijärvi'
        ],
        [
                'name': 'Pomarkku'
        ],
        [
                'name': 'Pori'
        ],
        [
                'name': 'Pornainen'
        ],
        [
                'name': 'Porvoo'
        ],
        [
                'name': 'Posio'
        ],
        [
                'name': 'Pudasjärvi'
        ],
        [
                'name': 'Pukkila'
        ],
        [
                'name': 'Punkalaidun'
        ],
        [
                'name': 'Puolanka'
        ],
        [
                'name': 'Puumala'
        ],
        [
                'name': 'Pyhtää'
        ],
        [
                'name': 'Pyhäjoki'
        ],
        [
                'name': 'Pyhäjärvi'
        ],
        [
                'name': 'Pyhäntä'
        ],
        [
                'name': 'Pyhäranta'
        ],
        [
                'name': 'Pälkäne'
        ],
        [
                'name': 'Pöytyä'
        ],
        [
                'name': 'Raahe'
        ],
        [
                'name': 'Raasepori'
        ],
        [
                'name': 'Raisio'
        ],
        [
                'name': 'Rantasalmi'
        ],
        [
                'name': 'Ranua'
        ],
        [
                'name': 'Rauma'
        ],
        [
                'name': 'Rautalampi'
        ],
        [
                'name': 'Rautavaara'
        ],
        [
                'name': 'Rautjärvi'
        ],
        [
                'name': 'Reisjärvi'
        ],
        [
                'name': 'Riihimäki'
        ],
        [
                'name': 'Ristijärvi'
        ],
        [
                'name': 'Rovaniemi'
        ],
        [
                'name': 'Ruokolahti'
        ],
        [
                'name': 'Ruovesi'
        ],
        [
                'name': 'Rusko'
        ],
        [
                'name': 'Rääkkylä'
        ],
        [
                'name': 'Saarijärvi'
        ],
        [
                'name': 'Salla'
        ],
        [
                'name': 'Salo'
        ],
        [
                'name': 'Saltvik'
        ],
        [
                'name': 'Sastamala'
        ],
        [
                'name': 'Sauvo'
        ],
        [
                'name': 'Savitaipale'
        ],
        [
                'name': 'Savonlinna'
        ],
        [
                'name': 'Savukoski'
        ],
        [
                'name': 'Seinäjoki'
        ],
        [
                'name': 'Sievi'
        ],
        [
                'name': 'Siikainen'
        ],
        [
                'name': 'Siikajoki'
        ],
        [
                'name': 'Siikalatva'
        ],
        [
                'name': 'Siilinjärvi'
        ],
        [
                'name': 'Simo'
        ],
        [
                'name': 'Sipoo'
        ],
        [
                'name': 'Siuntio'
        ],
        [
                'name': 'Sodankylä'
        ],
        [
                'name': 'Soini'
        ],
        [
                'name': 'Somero'
        ],
        [
                'name': 'Sonkajärvi'
        ],
        [
                'name': 'Sotkamo'
        ],
        [
                'name': 'Sottunga'
        ],
        [
                'name': 'Sulkava'
        ],
        [
                'name': 'Sund'
        ],
        [
                'name': 'Suomussalmi'
        ],
        [
                'name': 'Suonenjoki'
        ],
        [
                'name': 'Sysmä'
        ],
        [
                'name': 'Säkylä'
        ],
        [
                'name': 'Taipalsaari'
        ],
        [
                'name': 'Taivalkoski'
        ],
        [
                'name': 'Taivassalo'
        ],
        [
                'name': 'Tammela'
        ],
        [
                'name': 'Tampere'
        ],
        [
                'name': 'Tarvasjoki'
        ],
        [
                'name': 'Tervo'
        ],
        [
                'name': 'Tervola'
        ],
        [
                'name': 'Teuva'
        ],
        [
                'name': 'Tohmajärvi'
        ],
        [
                'name': 'Toholampi'
        ],
        [
                'name': 'Toivakka'
        ],
        [
                'name': 'Tornio'
        ],
        [
                'name': 'Turku'
        ],
        [
                'name': 'Tuusniemi'
        ],
        [
                'name': 'Tuusula'
        ],
        [
                'name': 'Tyrnävä'
        ],
        [
                'name': 'Ulvila'
        ],
        [
                'name': 'Urjala'
        ],
        [
                'name': 'Utajärvi'
        ],
        [
                'name': 'Utsjoki'
        ],
        [
                'name': 'Uurainen'
        ],
        [
                'name': 'Uusikaarlepyy'
        ],
        [
                'name': 'Uusikaupunki'
        ],
        [
                'name': 'Vaala'
        ],
        [
                'name': 'Vaasa'
        ],
        [
                'name': 'Valkeakoski'
        ],
        [
                'name': 'Valtimo'
        ],
        [
                'name': 'Vantaa'
        ],
        [
                'name': 'Varkaus'
        ],
        [
                'name': 'Vehmaa'
        ],
        [
                'name': 'Vesanto'
        ],
        [
                'name': 'Vesilahti'
        ],
        [
                'name': 'Veteli'
        ],
        [
                'name': 'Vieremä'
        ],
        [
                'name': 'Vihti'
        ],
        [
                'name': 'Viitasaari'
        ],
        [
                'name': 'Vimpeli'
        ],
        [
                'name': 'Virolahti'
        ],
        [
                'name': 'Virrat'
        ],
        [
                'name': 'Vårdö'
        ],
        [
                'name': 'Vöyri'
        ],
        [
                'name': 'Ylitornio'
        ],
        [
                'name': 'Ylivieska'
        ],
        [
                'name': 'Ylöjärvi'
        ],
        [
                'name': 'Ypäjä'
        ],
        [
                'name': 'Ähtäri'
        ],
        [
                'name': 'Äänekoski'
        ]
]

// First delete everything
eb.send(pa, ['action': 'delete', 'collection': 'municipalities', 'matcher': [:]])


for (municipality in municipalities) {
    eb.send(pa, [
            'action': 'save',
            'collection': 'municipalities',
            'document': municipality
    ])
}

// First delete everything
eb.send(pa, ['action': 'delete', 'collection': 'departments', 'matcher': [:]])



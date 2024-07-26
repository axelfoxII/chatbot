const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

//RESPUESTAS

const flowGracias = addKeyword(['Gracias','gracias','OK','Ok','ok']).addAnswer(['😉😍 Fue un gusto atenderte!!!!!'])
const flowSecundario = addKeyword(['1','2','3','GOLOZO','MEGA','Gracias','gracias','OK','Ok','ok']).addAnswer(['Su pedido fue recepcionado enseguida lo preparamos!!!'],
null,
null,
[flowGracias])


    //MENU SUSHI
    const flowMenu = addKeyword(['menu','Menu','menú','Menú','gracias', 'Gracias' ]).addAnswer(
        [
            '🚀 Escriba el número que desea comprar',
            '\n*1*.- 10 piezas x 30Bs.',
            '\n*2*.- 20 piezas x 50Bs. ',
            '\n*3*.-30 piezas x 80Bs.',
            
        ],
        null,
        null,
        [flowSecundario]
    )

//PROMOS SUSHI   
const flowPromos = addKeyword(['promos', 'promociones','Promo','promo']).addAnswer(
    [
        '😉 Escriba 👉GOLOZO si desea el primero ó escriba MEGA👈 si desea el segundo',
        '👉 GOLOZO 50 piezas x 100Bs.',
        '👉 MEGA 75 piezas x 150Bs. ',
        
        
    ],
    null,
    null,
    [flowSecundario]
)


//MENU DE INICIO
const flowPrincipal = addKeyword(['hola', 'buen dia','Buen dia', 'Buenas tardes','buenas tardes','Quisiera saber el menu', 'Buenas noches', 'salir','Salir'])
    .addAnswer('🙌 Hola bienvenido soy el *Chatbot* de 🥢JAPA SUSHI🍣🍣')
    .addAnswer(
        [
            'Aqui tienes el menú y promos del día escribe menu👈 o promos👈 para ver las ofertas',
            '👉 *menu* para ver las opciones',
            '👉 *promos* para ver las opciones',
            
        ],
        null,
        null,
        [flowPromos, flowMenu]
    )


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb({port:4804})
}

main()

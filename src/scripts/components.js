
/**
 * 
 * @param {*} client client object
 * @param {string} name HTML Element for user full name
 * @param {string} info HTML Element for client since - date
 * @param {string} pic HTML Element for picture address
 */
export function updateClients(client, name, info, pic) {
    name.innerHTML = client.name
    info.innerHTML = client.clientSince
    const defaultImg = '/src/assets/img/Default.jpg'

    if (client.img !== defaultImg) {
        pic.src = client.img;
    } else {
        pic.src = defaultImg
    }

    document.querySelector('#member-card header div p strong').innerHTML = client.loyaltyCard.cutsNeeded
}

/**
 * 
 * @param {*} client client object
 * @param {string} id HTML Element for user full name
 * @param {*} card HTML element for the member card
 */
export function updateCard(client, id, card) {
    card.innerHTML = ""
    let totalCuts = client.loyaltyCard.totalCuts
    id.innerHTML = `ID: ${client.id}`

    for (let i = 0; i < client.loyaltyCard.cutsNeeded - 1; i++) {
        const cardField = document.createElement("div")
        const checkMarkImg = document.createElement("img")
        checkMarkImg.src = `/src/assets/icons/checkmark-ok.png`

        if (totalCuts !== 0) {
            cardField.append(checkMarkImg)
            totalCuts--
        }

        card.append(cardField)
    }

    const cardField = document.createElement("div")
    const giftImg = document.createElement("img")

    if (client.loyaltyCard.cutsRemaining !== 0) {
        giftImg.src = `/src/assets/icons/gift.svg`
        giftImg.alt = "Caixa de presente no ultimo corte"
        giftImg.classList.add("gift-box")
    } else {
        giftImg.src = `/src/assets/icons/PinGift.png`
    }
    
    cardField.append(giftImg)
    card.append(cardField)
}

/**
 * 
 * @param {*} client client object
 * @param {*} history HTML element for the history card
 */
export function updateHistory(client, history) {
    history.innerHTML = ''

    if (client.appointmentHistory.length > 1) {
        document.getElementById('history-total').innerHTML = `${client.appointmentHistory.length} cortes`
    } else {
        document.getElementById('history-total').innerHTML = `${client.appointmentHistory.length} corte`
    }

    for (let index = 0; index < client.appointmentHistory.length; index++) {
        const historyLine = document.createElement('li')
        const historyInfo = document.createElement('div')
        const historyDate = document.createElement('h2')
        const historyHour = document.createElement('p')
        const historyImg = document.createElement('img')
        historyImg.src = "/src/assets/icons/checkmark-list.svg"
        
        historyDate.innerHTML = client.appointmentHistory[index].date
        historyHour.innerHTML = client.appointmentHistory[index].time

        historyInfo.append(historyDate, historyHour)
        historyLine.append(historyInfo, historyImg)
        history.append(historyLine)
    }
}

/**
 * 
 * @param {*} client client object
 * @param {*} remaining HTML element for the remaining text on the gift section
 * @param {*} completion HTML element for the completion text on the gift section
 * @param {*} slider HTML element for the completion slider on the gift section
 */
export function updateGifts(client, remaining, completion, slider) {

    // Conditionally update the text after the strong tag
    if (client.loyaltyCard.cutsRemaining > 1) {
        remaining.innerHTML = `<strong>${client.loyaltyCard.cutsRemaining}</strong> cortes restante`;
    } else {
        remaining.innerHTML = `<strong>${client.loyaltyCard.cutsRemaining}</strong> corte restante`;
    }

    completion.innerHTML = `${client.loyaltyCard.totalCuts} de ${client.loyaltyCard.cutsNeeded}`

    slider.style.width = `${(client.loyaltyCard.totalCuts / client.loyaltyCard.cutsNeeded) * 100}%`
}


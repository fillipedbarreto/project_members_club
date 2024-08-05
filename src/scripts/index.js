"use strict"

import { updateCard, updateClients, updateHistory, updateGifts } from "./components.js";

const form = document.querySelector('form');
const memberInput = document.getElementById('input-id');
const memberName = document.getElementById("member-name")
const memberInfo = document.getElementById("member-info")
const memberPic = document.getElementById("member-avatar")
const memberId = document.getElementById("member-id")
const memberCard = document.getElementById("stickers")
const memberHistory = document.getElementById("member-history")
const giftRemaining = document.getElementById("gift-remaining")
const giftCompletion = document.getElementById("gift-completion")
const sliderCompletion = document.getElementById('slider-completion')

form.addEventListener('submit', (event) => {
    event.preventDefault()
})

memberInput.addEventListener('change', (event) => {
    const inputPattern = /^\d{3}-\d{3}-\d{3}-\d{3}$/

    if(memberInput.value && !inputPattern.test(memberInput.value)) {
        memberInput.setCustomValidity(`Por favor, digite um ID do cartão válido.
            Formato esperado: XXX-XXX-XXX-XXX`)
    } else {
        fetchClientsByID(memberInput.value)
    }

})

async function fetchClientsByID(clientID) {
    const response = await fetch(`http://localhost:3333/clients`)
    const data = await response.json()
    let clientFound = false

    const clientsArray = data;
    for (let i = 0; i < clientsArray.length; i++) {
        if(clientsArray[i].id === clientID) {
            clientFound = true
            updateClients(clientsArray[i], memberName, memberInfo, memberPic)
            updateCard(clientsArray[i], memberId, memberCard)
            updateHistory(clientsArray[i], memberHistory)
            updateGifts(clientsArray[i], giftRemaining, giftCompletion, sliderCompletion)
            memberInput.value = ''
            return;
        }
    }

    try {
        if(!clientFound) throw new Error
    } catch (error) {
        alert(`ID do cartão (${memberInput.value}) não encontrado. Por favor, tente novamente`)
        memberInput.value = ''
        return
    }
}

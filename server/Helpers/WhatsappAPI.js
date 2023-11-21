require('dotenv').config();
const express = require('express');
const request = require('request');

require('dotenv').config();

async function sendMessage(req, res) { 
let resData = {
        status: false,
        answare: ''
    }
    try {
        const options = {
            method: 'POST',
            url: 'https://graph.facebook.com/v17.0/127061973834550/messages',
            headers: {
                Authorization: process.env.SECRET_KEY,
                'Content-Type': 'application/json'
            },
            body: {
                messaging_product: 'whatsapp',
                to: process.env.MESSAGE_TO,
                type: 'template',
                template: {
                    name: 'box_office_movie_ticket_booking',
                    language: {
                        code: 'en_US'
                    }
                }
            },
            json: true
        };
        request(options, function(error, response, body) {
            if (error) throw new Error(error);
            //+++++++++++++++++++++++++++++++++++++++++++++
            resData.status = true;
            resData.respondData = body;
            return res.status(200).json(resData);
        });
    } catch (e) {
        resData.status = false;
        resData.answare = e;
        return res.status(200).json(resData);
    }
}
exports.sendMessage = sendMessage;
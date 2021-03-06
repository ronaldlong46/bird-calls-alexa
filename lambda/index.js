// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const birds = {
    "calls":
        [
            {"name": "Osprey", "file": "https://fishingbakersfield.com/alexa/osprey.mp3"},
            {"name": "Bald Eagle", "file": "https://fishingbakersfield.com/alexa/baldeagle.mp3"},
            {"name": "Canada Geese", "file": "https://fishingbakersfield.com/alexa/canadageese.mp3"},
            {"name": "American Robin", "file": "https://fishingbakersfield.com/alexa/americanrobin.mp3"},
            {"name": "Alder Flycatcher", "file": "https://fishingbakersfield.com/alexa/alderflycatcher.mp3"},
            {"name": "Anhinga", "file": "https://fishingbakersfield.com/alexa/anhinga.mp3"},
            {"name": "Clarks Nutcracker", "file": "https://fishingbakersfield.com/alexa/clarksnutcracker.mp3"},
            {"name": "Common Poorwill", "file": "https://fishingbakersfield.com/alexa/commonpoorwill.mp3"},
            {"name": "Common Raven", "file": "https://fishingbakersfield.com/alexa/commonraven.mp3"},
            {"name": "Alder Flycatcher", "file": "https://fishingbakersfield.com/alexa/alderflycatcher.mp3"},
            {"name": "Dawn Chorus", "file": "https://fishingbakersfield.com/alexa/dawnchorus.mp3"},
            {"name": "Alder Flycatcher", "file": "https://fishingbakersfield.com/alexa/alderflycatcher.mp3"},
            {"name": "Hermit Thrush", "file": "https://fishingbakersfield.com/alexa/hermitthrush.mp3"},
            {"name": "Killdeer", "file": "https://fishingbakersfield.com/alexa/killdeer.mp3"},
            {"name": "Northern Flicker", "file": "https://fishingbakersfield.com/alexa/northernflicker.mp3"},
            {"name": "Ptarmigan", "file": "https://fishingbakersfield.com/alexa/ptarmigan.mp3"},
            {"name": "Sandhill Crane", "file": "https://fishingbakersfield.com/alexa/sandhillcrane.mp3"},
            {"name": "Spotted Owl", "file": "https://fishingbakersfield.com/alexa/spottedowl.mp3"},
        ]
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome, would you like to hear a random bird call?';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const BirdCallIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'BirdCallIntent';
    },
    handle(handlerInput) {
        const randomNum = Math.floor(Math.random() * birds.calls.length)
        return handlerInput.responseBuilder
            .speak(`Alright, here is a ${birds.calls[randomNum].name} call <audio src="${birds.calls[randomNum].file}"/>`)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('You can say play a random bird call or cancel! How can I help you?')
            .reprompt('How can I help you?')
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        BirdCallIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();

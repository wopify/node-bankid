const https = require('https');
const xml2js = require('xml2js').parseString;

module.exports = {
  sign(argObj, callback){
    var personalNumber = argObj.personalNumber;
    var endUserInfo    = argObj.endUserInfo;
    var requirementAlternatives = argObj.requirementAlternatives;
    var userVisibleData = argObj.userVisibleData;
    var userNonVisibleData = argObj.userNonVisibleData;

//API call returns orderResponse of type OrderResponseType or error
    https.get(this.wsURL + '?', (res)=>{

      res.on('data', (data)=>{
        return callback(
          xml2js(data)
        );
      });

    }).on('error', (e)=>{
      console.error("API call error: ", e);
    });

  },
  auth(personalNumber){

  },
  validatePersonalNumber(personalNumber, callback){
    var response = personalNumber.length === 12 ?
    true:
    console.error("Personalnumber is not 12 characters.");

    return callback(response);
  },

  wsURL: 'https://appapi.bankid.com/rp/v4',
  messages: {
    RFA1: {
      sv: "Starta BankID-appen",
      en: "Start your BankID app",
      event: ["OUTSTANDING_TRANSACTION", "NO_CLIENT"]
    },
    RFA2: {
      sv: "Du har inte BankID-appen installerad. Kontakta din internetbank.",
      en: "The BankID app is not installed. Please contact your internet bank",
      event: ["NOT_INSTALLED"]
    },
    RFA3: {
      sv: "Åtgärden avbruten. Försök igen.",
      en: "Action cancelled. Please try again",
      event: ["ALREADY_IN_PROGRESS", "CANCELLED"]
    },
    RFA5: {
      sv: "Internt tekniskt fel. Försök igen.",
      en: "Internal error. Please try again.",
      event: ["RETRY", "INTERNAL_ERROR", "CLIENT_ERR"]
    },
    RFA6: {
      sv: "Åtgärden avbruten.",
      en: "Action cancelled",
      event: ["USER_CANCEL"]
    },
    RFA8: {
      sv: "BankID-appen svarar inte. Kontrollera att den är startad och att du har internetanslutning. Om du inte har något giltigt BankID kan du hämta ett hos din Bank. Försök sedan igen.",
      en: "The BankID app is not responding. Please check that the program is started and that you have internet access. If you don’t have a valid BankID you can get one from your bank. Try again.",
      event: ["EXPIRED_TRANSACTION"]
    },
    RFA9: {
      sv: " Skriv in din säkerhetskod i BankID-appen och välj Legitimera eller Skriv under.",
      en: "Enter your security code in the BankID app and select Identify or Sign.",
      event: ["USER_SIGN"]
    },
    RFA12: {
      sv: "Skriv in din säkerhetskod i BankID-appen och välj Legitimera eller Skriv under.",
      en: "Enter your security code in the BankID app and select Identify or Sign.",
      event: ["USER_SIGN"]
    },
    RFA13: {
      sv: "Försöker starta BankID-appen",
      en: "Trying to start your BankID app",
      event: ["OUTSTANDING_TRANSACTION"]
    },
    RFA14A: {
      sv: "Söker efter BankID, det kan ta en liten stund… Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella inloggningen/underskriften i den här datorn. Om du har ett BankIDkort, sätt in det i kortläsaren. Om du inte har något BankID kan du hämta ett hos din internetbank. Om du har ett BankID på en annan enhet kan du starta din BankID-app där.",
      en: "Searching for BankID:s, it may take a little while… If a few seconds have passed and still no BankID has been found, you probably don’t have a BankID which can be used for this login/signature on this computer. If you have a BankID card, please insert it into your card reader. If you don’t have a BankID you can order one from your internet bank. If you have a BankID on another device you can start the BankID app on that device.",
      event: ["STARTED", "DESKTOP"]
    },
    RFA14B: {
      sv: "Söker efter BankID, det kan ta en liten stund… Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella inloggningen/underskriften i den här enheten. Om du inte har något BankID kan du hämta ett hos din internetbank. Om du har ett BankID på en annan enhet kan du starta din BankID-app där.",
      en: "Searching for BankID:s, it may take a little while… If a few seconds have passed and still no BankID has been found, you probably don’t have a BankID which can be used for this login/signature on this device. If you don’t have a BankID you can order one from your internet bank. If you have a BankID on another device you can start the BankID app on that device.",
      event: ["STARTED", "MOBILE"]
    },
    RFA15A: {
      sv: "Söker efter BankID, det kan ta en liten stund… Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella inloggningen/underskriften i den här datorn. Om du har ett BankIDkort, sätt in det i kortläsaren. Om du inte har något BankID kan du hämta ett hos din internetbank.",
      en: "Searching for BankID:s, it may take a little while… If a few seconds have passed and still no BankID has been found, you probably don’t have a BankID which can be used for this login/signature on this computer. If you have a BankID card, please insert it into your card reader. If you don’t have a BankID you can order one from your internet bank.",
      event: ["STARTED", "PC"]
    },
    RFA15B: {
      sv: "Söker efter BankID, det kan ta en liten stund… Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella inloggningen/underskriften i den här enheten. Om du inte har något BankID kan du hämta ett hos din internetbank.",
      en: "Searching for BankID:s, it may take a little while… If a few seconds have passed and still no BankID has been found, you probably don’t have a BankID which can be used for this login/signature on this device. If you don’t have a BankID you can order one from your internet bank",
      event: ["STARTED", "MOBILE"]
    },
    RFA16: {
      sv: "Det BankID du försöker använda är för gammalt eller spärrat. Använd ett annat BankID eller hämta ett nytt hos din internetbank.",
      en: "The BankID you are trying to use is revoked or too old. Please use another BankID or order a new one from your internet bank.",
      event: ["CERTIFICATE_ERR"]
    },
    RFA17: {
      sv: "BankID-appen verkar inte finnas i din dator eller telefon. Installera den och hämta ett BankID hos din internetbank. Installera appen från install.bankid.com.",
      en: "The BankID app couldn’t be found on your computer or mobile device. Please install it and order a BankID from your internet bank. Install the app from install.bankid.com.",
      event: ["START_FAILED"]
    },
    RFA18: {
      sv: "Starta BankID-appen",
      en: "Start the BankID app",
      event: ["???"]//The name of link or button used to start the BankID App
    },
    RFA19: {
      sv: "Vill du logga in eller skriva under med BankID på den här datorn eller med ett Mobilt BankID?",
      en: "Would you like to login or sign with a BankID on this computer or with a Mobile BankID?",
      event: ["???"] //The user access the service using a browser on a personal computer.
    },
    RFA20: {
      sv: "Vill du logga in eller skriva under med ett BankID på den här enheten eller med ett BankID på en annan enhet?",
      en: "Would you like to login or sign with a BankID on this device or with a BankID on another device?",
      event: ["???"] //The user access the service using a browser on a mobile device
    }
  }

};

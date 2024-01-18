const demoOneTimePad = [
    "48090", "79776", "45366", "46827", "11680",
    "68496", "47757", "10126", "36660", "25066",
    "07418", "79781", "48209", "28600", "65589",
    "04417", "18375", "89891", "68548", "65437",
    "96152", "81871", "38849", "23191", "35777",
    "59888", "98186", "01174", "19456", "73831",
    "74345", "88365", "39797", "08166", "97776",
    "96571", "53718", "56970", "37940", "60539",
    "91243", "74502", "87465", "41884", "44533",
    "72057", "94612", "35304", "29054", "33274",
]


const contestOneTimePad = [
    "14358", "89753", "24133", "40169", "26799",
    "70989", "22764", "12314", "85833", "27385",
    "12536", "48877", "47630", "14408", "80067",
    "01849", "00627", "52820", "13144", "99889",
    "04990", "79386", "92065", "27407", "81950",
    "11744", "80036", "65687", "47220", "90951",
    "11992", "14645", "89442", "77663", "02865",
    "79074", "84763", "03878", "40377", "04130",
    "00328", "91389", "46381", "77841", "83946",
    "22480", "85516", "74633", "99463", "98484",
    "78402", "30870", "15798", "34287", "49115",
    "40241", "73919", "64265", "56157", "76828",
]


const conversionChart = {
    "0": "CODE",
    "1": "A",
    "2": "E",
    "3": "I",
    "4": "N",
    "5": "O",
    "6": "T",
    "70": "B",
    "71": "C",
    "72": "D",
    "73": "F",
    "74": "G",
    "75": "H",
    "76": "J",
    "77": "K",
    "78": "L",
    "79": "M",
    "80": "P",
    "81": "Q",
    "82": "R",
    "83": "S",
    "84": "U",
    "85": "V",
    "86": "W",
    "87": "X",
    "88": "Y",
    "89": "Z",
    "90": "FIG",
    "91": ".",
    "92": ":",
    "93": "\"",
    "94": " ",
    "95": "+",
    "96": "-",
    "97": "=",
    "98": "REQ",
    "99": " ",
}


const codebook = {
    "000": "ABORT",
    "019": "ACCEPT",
    "028": "ACCESS",
    "037": "ADDRESS",
    "253": "DECODE",
    "262": "DELAY",
    "271": "DIFFICULT",
    "280": "DOCUMENT",
    "046": "AFFIRMATIVE",
    "299": "ENCODE",
    "055": "AGENT",
    "307": "EVENING",
    "064": "AIRPLANE",
    "316": "EXECUTE",
    "073": "AIRPORT",
    "082": "ANSWER",
    "091": "AUTHORITY",
    "109": "BETWEEN",
    "118": "BORDER",
    "127": "BUILDING",
    "136": "CANCEL",
    "145": "CHANGE",
    "154": "CIVILIAN",
    "325": "FACTORY",
    "334": "FAILED",
    "343": "FERRY",
    "352": "FLIGHT",
    "361": "FREQUENCY",
    "370": "HARBOUR",
    "389": "HELICOPTER",
    "398": "HIGHWAY",
    "406": "IDENTITY",
    "163": "COMPROMISE",
    "415": "IMMEDIATE",
    "172": "COMPUTER",
    "181": "CONFIRM",
    "190": "CONTACT",
    "424": "IMPOSSIBLE",
    "505": "MILITARY",
    "514": "MONEY",
    "523": "MONTH",
    "532": "MORNING",
    "541": "MORSE",
    "550": "NEGATIVE",
    "569": "NIGHT",
    "758": "STREET",
    "767": "SUBWAY",
    "776": "SUCCESS",
    "785": "SUPPLY",
    "794": "SUPPORT",
    "802": "TELEPHONE",
    "811": "TODAY",
    "578": "OBSERVATION",
    "820": "TOMORROW",
    "587": "PASSPORT",
    "596": "PERSON",
    "839": "TRAIN",
    "848": "TRANSFER",
    "604": "PHOTOGRAPH",
    "857": "TRANSMIT",
    "613": "POSITIVE",
    "622": "POSSIBLE",
    "631": "POWER",
    "640": "PRIORITY",
    "659": "PROBLEM",
    "668": "QUESTION",
    "677": "RADIO",
    "433": "INFORMATION",
    "686": "RECEIVE",
    "866": "TRAVEL",
    "875": "TRUCK",
    "884": "UNABLE TO",
    "893": "URGENT",
    "901": "VERIFY",
    "910": "WEEK",
    "929": "WITHIN",
    "938": "YESTERDAY",
    "442": "INSTRUCTIONS",
    "695": "RENDEZVOUS",
    "947": "MOSCOW",
    "208": "COORDINATE",
    "451": "LOCATE",
    "217": "COUNTRY",
    "226": "COVERT",
    "235": "CURRENT",
    "244": "DANGER",
    "956": "BERLIN",
    "712": "RESERVATION",
    "965": "PARIS",
    "703": "REPEAT",
    "460": "LOCATION",
    "479": "MAIL",
    "488": "MEETING",
    "497": "MESSAGE",
    "721": "ROUTINE",
    "730": "SATELLITE",
    "749": "SHIP",
    "974": "LONDON",
    "983": "ISTANBUL",
    "992": "PRAGUE"
}


function addKeyToMessage(message, oneTimePad) {
    // Find the index of the key indicator
    const keyIndicator = oneTimePad.indexOf(message[0]);

    // One by one, add the key to each group of 5 digits
    const plaintext = [];
    for (let idx = 1; idx < message.length; idx++) {
        const group = message[idx];
        let plaintextGroup = "";

        // Find the one-time pad group, offset by the key indicator and group index
        const optKey = oneTimePad[keyIndicator + idx];

        // Add the digits, from left to right, ignoring any tens
        for (let i = 0; i < 5; i++) {
            plaintextGroup += String((parseInt(group[i]) + parseInt(optKey[i])) % 10);
        }

        // Add the plaintext group to the plaintext array
        plaintext.push(plaintextGroup);
    }

    return plaintext;
}


function convertToPlaintext(message, oneTimePad, conversionChart, codebook) {
    let decodedPlaintext = "";

    // Add the offset key to the message
    const offsetMessage = addKeyToMessage(message, oneTimePad);

    // Deal with each group one character at a time
    const groupList = Array.from(offsetMessage.join(""));

    // We process one or two characters at a time until there's nothing left in the group
    let currentChars = "";

    while (groupList.length > 0) {
        // Grab a character
        currentChars += groupList.shift();

        // If it's a match, add the plaintext to the message and reset the current characters
        if (currentChars in conversionChart) {
            const translated = conversionChart[currentChars];

            // If a figure is coming, we have to decode the whole thing until the next FIG tag
            if (translated === "FIG") {
                decodedPlaintext += " ";

                // While the next three characters are the same, decode them as numbers
                while (new Set(groupList.slice(0, 3)).size === 1) {
                    // Get the next three characters
                    const figure = groupList.splice(0, 3).join("");
                    // Add the figure to the decoded plaintext
                    decodedPlaintext += figure[0];
                }
            } else if (translated === "CODE") {
                const codegroup = groupList.splice(0, 3).join("");
                decodedPlaintext += codebook[codegroup];
            } else {
                decodedPlaintext += conversionChart[currentChars];
            }

            // Reset the characters being decoded
            currentChars = "";
        }
    }

    return decodedPlaintext;
}
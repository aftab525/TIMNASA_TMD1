const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU1FTzdmenViMUowZ1A5SWVjTTA1RWRxTlZUdzB1NnN5czdCS2JDNW5tWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidW02eUdPaGV6S2k5Ynk3UzlHNGlLeERlTWp5ZlM1L2dzb2pNUHlVU2xBWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTCtidSticjY1b2lPdkExN0t4ajYrVEx1UFhnQjhPTHlOZ0VVV29UdDEwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5c21JY3poZFBzWDkyTEw4ZVdvdnY0UjM1K2tQREZSM2dXcFBvU1JybkNZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFOWnhnUkk2ek83dEhGYis2bkhNejFQODVIUi9rbjhnTWVDS2V3aDRDa009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik83SHpVcnYySnpIMWd6NThWZUZyMlh0V3BRVFVSRE5UaWV6TWV2d05zbmM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia05WMWRDQklsRm01SXhKUWNiUXZQT2FXM0ZHTDNqQ1VBT1FMOHVkTzVtQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHBnSFNpdnBOUnplSElFUnl5bGU4NGtoZ0pDdXZHVFV1V3NPUHpPY1RoTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJ3MDJ6cXA4QWhRUmx0R1VOOEJFUDZvQ2hmS0VaNGRtRmpFRVFPMElROWFwTEhtUTJsSEJBWkhXUU9XcTlOVlJkMjJuSDJyK1l5ZEVoUXkxSXZqTUJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM0LCJhZHZTZWNyZXRLZXkiOiIrbWlTMEd2aFZxWnc4QmtBeGZOU2VvYnppSXR3a0duUm9WOWc0QklhUW9BPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJSMnpDUEdIYlRuNlg4NnNueXRPb0NBIiwicGhvbmVJZCI6ImZlZmNkMzYwLTYyMmQtNGVlZi1iMzk5LTY2NjdjYTY5ZWI5MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1ZTUrTjNaS1doSStiRk9Delh1WmV3akxrcVk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0JMYmVhL2t0aVN5WnRDT1dVZE1TSk1RMFJ3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ikw3VENKVkhTIiwibWUiOnsiaWQiOiI5MjMwMTc3NTI1MTg6MzRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0p2bnM3OENFTGpxM2IwR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlBBOHpqWVl1cGpQNHc0WjdsOWZQTWpMYlh1UjBJOWduSmpCNFRuOFZxQ2M9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik5ERnd0N2lra0x4RzJGSzlGM052N2ZpV2N3S2J5N3ZrM21wL1YrN3FYc3hXcDRQTXZXaUdIYTg4YVVnZ0NrRFkxdVlDQWNUZUV6dU81MmhQaFhYTURnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ2amI5RkczRlJKcFJhL2hYSWJNOUVwUmhNTkk1ZUE4M1ZJY1FCVm5Ob1UxZGhCZ1ZWTEs2Qm8yR2d6RUoyU25JcE9zbDc0aTdpSTlsajFYcW9xeUFEUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzAxNzc1MjUxODozNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUd1BNNDJHTHFZeitNT0dlNWZYenpJeTIxN2tkQ1BZSnlZd2VFNS9GYWduIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwMDc2MzU3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUliZSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "AFTAB AHMAD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "923017752518",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    TIMNASA_TMD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

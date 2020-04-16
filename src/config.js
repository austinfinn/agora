module.exports = {
    products:{
        hostNames: {
            anz:"https://api.anz",
            cba:"https://api.commbank.com.au/public",
            nab:"https://openbank.api.nab.com.au",
            westpac:"https://digital-api.westpac.com.au"
        },
        category:{
            currentAndSavings:"TRANS_AND_SAVINGS_ACCOUNTS",
            cards:"CRED_AND_CHRG_CARDS",
            loans:"PERS_LOANS",
            mortgages:"RESIDENTIAL_MORTGAGES",
            fixedSavings:"TERM_DEPOSITS"
        }
    },
    users:{
        loginCredentials:{
            cachingTime: 60
        }
    }
}
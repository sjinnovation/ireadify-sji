var config = {
    userRole: {
        admin: "owner"
    },
    isDeleted : {
        yes: 1,
        no: 0
    },
    bookType : {
        AUDIO: "AUDIO",
        EPUB: "EPUB"
    },
    subscriptionType:  {
        paypal: 'PAYPAL',
        authorizeNet: 'AUTHORIZENET'
    },
    region : {
        region1: "Asia",
        region2: "Africa",
        region3: "America",
        region4: "Europe",
        region5: "Other",
    },
    topic : {
        account: "How to Log-in to your iReadify account?",
        payments: "Subscription & payment",
        general: "General questions"
    },
    ireader: {
        url: "https://magicbox.magicsw.com/ltigateway.htm",
        consumerKey: "ff454783ce75440af0d6c8b048af8c09",
        secretKey: "a51dcf0ec8274dfff20c65d162f6c2f0"
    }
}

module.exports = config;

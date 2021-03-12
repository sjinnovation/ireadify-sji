//Make this dynamic to take care of production

var config = {
  prod: {
    paypalClientId: 'ARrYpMKRCD6wqKZwCWOwfJLFLHn3uGbhn7baYHXWwKoJ6r00e6PiJo-M0v6kbhEZqQBwU2SYxt38PDFa',
    paypalSecretId: 'EAzj9UAy8T8hSKjyODMf1W-AXJoTKd6eXZ9XCKf3GgZOXb0yuFrKUVQM-TkpxisNI6Kpw17Qa4fusTbX',
    paypalUrl: 'https://api-m.sandbox.paypal.com',
    subscriptionTable: 'UserSubscription-crwjs4i4urg75nzasovtzlrqj4',
    subscriptionType:  {
      paypal: 'PAYPAL',
      authorizeNet: 'AUTHORIZENET'
    },
    authorizeNetApiLoginKey: '62tt4K4HG86',
    authorizeNetTransactionKey: '8vZxs4M7jBYY3559',
    creditCardTestPrice: 0.01,
    subscriptionPrice: 8.99,
    trailPeroidDays: 14
  },
  dev: {
    paypalClientId: 'ARrYpMKRCD6wqKZwCWOwfJLFLHn3uGbhn7baYHXWwKoJ6r00e6PiJo-M0v6kbhEZqQBwU2SYxt38PDFa',
    paypalSecretId: 'EAzj9UAy8T8hSKjyODMf1W-AXJoTKd6eXZ9XCKf3GgZOXb0yuFrKUVQM-TkpxisNI6Kpw17Qa4fusTbX',
    paypalUrl: 'https://api-m.sandbox.paypal.com',
    subscriptionTable: 'UserSubscription-kqxqmnfkyjcp3cfnltojiupow4',
    subscriptionType:  {
      paypal: 'PAYPAL',
      authorizeNet: 'AUTHORIZENET'
    },
    authorizeNetApiLoginKey: '62tt4K4HG86',
    authorizeNetTransactionKey: '8vZxs4M7jBYY3559',
    creditCardTestPrice: 0.01,
    subscriptionPrice: 8.99,
    trailPeroidDays: 1
  }
}

module.exports = config;

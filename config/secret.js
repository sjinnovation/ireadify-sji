const config = {
    prod: {
      paypalClientId: 'ARrYpMKRCD6wqKZwCWOwfJLFLHn3uGbhn7baYHXWwKoJ6r00e6PiJo-M0v6kbhEZqQBwU2SYxt38PDFa',
      paypalPlanIdWithTrial: 'P-1T3974567G874090AMARIW5A',
      paypalPlanIdWithoutTrial: 'P-52N51904EW982124PMARIYBA'
    },
    dev: {
      paypalClientId: 'ARrYpMKRCD6wqKZwCWOwfJLFLHn3uGbhn7baYHXWwKoJ6r00e6PiJo-M0v6kbhEZqQBwU2SYxt38PDFa',
      paypalPlanIdWithTrial: 'P-1T3974567G874090AMARIW5A',
      paypalPlanIdWithoutTrial: 'P-52N51904EW982124PMARIYBA'
    }
}

export default process.env.NEXT_PUBLIC_LIVE === 'true' ? config.prod : config.dev;

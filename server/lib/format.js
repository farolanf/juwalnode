exports.prec2 = val => parseFloat(Math.round(val * 100) / 100).toFixed(2)

exports.createFormatCurrency = currencyCode => val => `${currencyCode} ${exports.prec2(val)}`

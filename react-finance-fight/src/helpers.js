// //////////////////////////////
// HELPER FUNCTIONS
// //////////////////////////////

// Convert string to title case
export function toTitleCase(string){
  return string.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

// Format numbers as currency
export function currencyFormat(number){
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return formatter.format(number)
}

// Format currency change for profile
export function currencyChangeFormat(number){
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  if (number > 0){
    return '+' + formatter.format(number)
  }
  return formatter.format(number)
}

// Shorten market cap based on M, B, T
export function shortenMktCap(number){
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 6
  })
  if (number > 1000000000000){
      number = (number / 1000000000000).toFixed(3)
      return formatter.format(number)+'T'
    }else if (number > 1000000000){
    number = (number / 1000000000).toFixed(3)
    return formatter.format(number)+'B'
    }else{
    number = (number / 1000000).toFixed(3)
    return formatter.format(number)+'M'
  }
}

// Format dollar change & percent change based on +/-
export function formatChange(number){
  if (number > 0){
    return '+'+number.toFixed(2)
  }else{
    return number.toFixed(2)
  }
}

// Format numbers w/ commas every 3 digits
export function formatRegNumber(number){
  const formatter = new Intl.NumberFormat('en-US')
  return formatter.format(number)
}

// Get variable for text color change based on +/- asset change
export function changeColor(string){
  const changeColor = (string.startsWith('+')) ? 'green' : 'red'
  return changeColor
}
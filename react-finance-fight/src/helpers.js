// ##############################################################
// Helper functions
// ##############################################################

// Convert string to title case
export function toTitleCase(string){
  return string.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}
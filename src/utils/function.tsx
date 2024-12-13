export function convertToIST(dateString) {
    // Parse the ISO date string to a Date object
  
    if (!dateString) return "";
    const date = new Date(dateString);
  
    // Get the date in IST by adding 5 hours and 30 minutes to UTC
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const istDate = new Date(date.getTime() + istOffset);
  
    // Format the date in dd-mm-yyyy
    const day = String(istDate.getUTCDate()).padStart(2, "0");
    const month = String(istDate.getUTCMonth() + 1).padStart(2, "0");
    const year = istDate.getUTCFullYear();
  
    return `${day}-${month}-${year}`;
  }
  
  export function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
function dateFormat(){
    const fullMonths = [
        '','January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
    const d = new Date()
    const formatDate = `${fullMonths[d.getMonth()+1]} ${d.getDate()}, ${d.getFullYear()}`
    return formatDate
}

function generateKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';

  for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters.charAt(randomIndex);
  }
  const genKey = key;
  return genKey;
}

module.exports = {dateFormat,generateKey};

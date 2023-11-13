function dateFormat(){
    const fullMonths = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
    const d = new Date()
    const formatDate = `${fullMonths[d.getMonth()+1]} ${d.getDate()}, ${d.getFullYear()}`
    return formatDate
}

module.exports = dateFormat;
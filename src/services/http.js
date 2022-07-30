/**
 * 
 * @param {Object} data 
 * @param {String} serverKey 
 * @returns 
 */

 const sendFCM = async (data = {}, serverKey) => {
    const body = {
      to: '/topics/all',
      data
    };
  
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; UTF-8',
        Authorization: `key=${serverKey}`
      }),
      body: JSON.stringify(body)
    });
    return response.json();
};

module.exports = {
    sendFCM
}
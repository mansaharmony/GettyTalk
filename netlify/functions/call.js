// netlify/functions/call.js
exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  console.log('Received message:', data);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow from all origins
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify({ message: 'Call received successfully!' }),
  };
};

const cors = require('cors');
const corsOption = {
    credentials: true,
    origin: 'http://localhost:3000',
};

module.exports.corsOptions = corsOption;
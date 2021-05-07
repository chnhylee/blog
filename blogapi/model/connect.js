const mongoose = require('mongoose');
mongoose.connect('mongodb://aeromu:123456@localhost:27017/blog',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }

).then().catch()
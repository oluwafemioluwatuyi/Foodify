
const app = require('./src/app');
const db = require('./src/models/index'); // Sequelize models



    // Start the server after syncing the models
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });



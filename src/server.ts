import 'dotenv/config';

import app from './app';

app.listen(3001, () => {
  console.log(
    `🚀 Server ready at http://localhost: 3001`,
  );
});

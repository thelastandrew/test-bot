import 'module-alias/register';

import { app } from '@/app';
import { settings } from '@/common';

const port = settings.PORT;

const start = async () => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

start();

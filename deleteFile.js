let fs = require('fs');

fs.rm(
  `./report/regression${process.env.ENV}.html`,
  { recursive: true },
  (err) => {
    if (err) {
      // File deletion failed
      console.error(err.message);
      return;
    }
    console.log('File deleted successfully');
  }
);

import { UnsupportedMediaTypeException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';

type mimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validMimeType: mimeType[] = ['image/png', 'image/jpg', 'image/jpeg'];

export const storageConfig = {
  storage: diskStorage({
    destination: 'files',
    filename: (req, image, callback) => {
      const filename = `${basename(
        image.originalname,
        extname(image.originalname),
      )}-${Date.now()}${extname(image.originalname)}`;
      callback(null, filename);
    },
  }),
  fileFilter: function (req, file, callback) {
    const allowedMimeType: mimeType[] = validMimeType;
    allowedMimeType.includes(file.mimetype)
      ? callback(null, true)
      : callback(
          new UnsupportedMediaTypeException('Only images are allowed'),
          false,
        );
  },
  limits: {
    fileSize: 1048576,
  },
};

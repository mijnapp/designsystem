/**
 * Convert bytes to human readable file size.
 *
 * @param {number} bytes
 * @return {string}
 */
export function convertToHumanReadableFileSize (bytes) {
  var size = bytes + ' ' + 'bytes';
  var multiples = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  var nApprox = bytes / 1024;
  for (var multiple = 0; nApprox > 1; nApprox /= 1024, multiple++) {
    size = nApprox.toFixed(3) + ' ' + multiples[multiple];
  }

  return size;
}

/**
 * Retrieve filename from filename (this also contains the extension).
 *
 * @param {string} filename
 * @return {null|string}
 */
export function getFileName (filename) {
  var filenameSplit = filename.split('.');

  if (!filenameSplit.length) {
    return null;
  }

  return filenameSplit.slice(0, -1).join('.');
}

/**
 * Retrieve file extension from filename.
 *
 * @param {string} filename
 * @return {null|string}
 */
export function getFileExtension (filename) {
  var filenameSplit = filename.split('.');

  if (!filenameSplit.length) {
    return null;
  }

  return filenameSplit.slice(filenameSplit.length - 1)[0];
}

/**
 * Retrieve file information from uploaded file.
 *
 * @param {File} file
 * @return {null|{extension: string, size: number, name: string, humanReadableSize: string}}
 */
export function getFileInfo (file) {

  if (typeof file === 'undefined') {
    return null;
  }

  return {
    name: getFileName(file.name),
    size: file.size,
    humanReadableSize: convertToHumanReadableFileSize(file.size),
    extension: getFileExtension(file.name),
  };
}

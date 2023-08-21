export const downloadBlobFile = (data: Blob, fileName: string) => {
  const href = URL.createObjectURL(data);

  // create "a" HTML element with href to file & click
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', `Faktura-${fileName}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

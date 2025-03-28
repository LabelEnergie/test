export function getIconByFile(name: string) {
  const splitted = name.split(".");
  switch (splitted[splitted.length - 1]) {
    case "pdf":
      return "/icons/pdf.png";
    case "png":
    case "jpg":
    case "jpeg":
      return "/icons/image.png";
    default:
      return "/icons/fichier.png";
  }
}

export function getFileNamesByUrls(urls: string[]) {
  return urls.map(getFileNameByUrl);
}

export function getFileNameByUrl(url: string) {
  if (typeof url != "string") return url;

  const splitted = url.split("/");
  return splitted[splitted.length - 1];
}

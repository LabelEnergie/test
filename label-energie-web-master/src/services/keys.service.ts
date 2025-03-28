export const simulatorKeys = {
  root: ["Simulator"],
  tree: () => [...simulatorKeys.root, "tree"],
};

export const authKeys = {
  root: ["Auth"],
  me: () => [...authKeys.root, "me"],
};

export const folderKeys = {
  root: ["Folders"],
  list: () => [...folderKeys.root, "list"],
};

export const articleKeys = {
  root: ["Article"],
  list: () => [...articleKeys.root, "list"],
  detail: (code: string) => [...articleKeys.root, "detail", code],
};

export const chatMessageKeys = {
  root: ["Message"],
  list: (userId: string) => [...chatMessageKeys.root, "list", userId],
};

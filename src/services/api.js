const KEY = "codeprepx_data";

const api = {
  getFolders: () => {
    const data = JSON.parse(localStorage.getItem(KEY)) || [];
    return Promise.resolve({ data });
  },

  createFolder: (name) => {
    const data = JSON.parse(localStorage.getItem(KEY)) || [];
    const newFolder = { id: Date.now(), name, files: [] };
    const updated = [newFolder, ...data];
    localStorage.setItem(KEY, JSON.stringify(updated));
    return Promise.resolve({ folder: newFolder });
  },

  createFile: (folderId, fileName, language) => {
    const data = JSON.parse(localStorage.getItem(KEY)) || [];
    const folder = data.find(f => f.id === folderId);
    if (!folder) return Promise.reject("Folder not found");

    const newFile = { id: Date.now(), name: fileName, language, code: "" };

    // Optional: Add boilerplate for Java/C++/Python
    if (language === "java") newFile.code = `public class ${fileName.split(".")[0]} {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}`;
    if (language === "cpp") newFile.code = `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello World";\n    return 0;\n}`;
    if (language === "python") newFile.code = `print("Hello World")`;

    folder.files.push(newFile);
    localStorage.setItem(KEY, JSON.stringify(data));
    return Promise.resolve({ file: newFile });
  },

  deleteFolder: (folderId) => {
    const data = JSON.parse(localStorage.getItem(KEY)) || [];
    const newData = data.filter(f => f.id !== folderId);
    localStorage.setItem(KEY, JSON.stringify(newData));
    return Promise.resolve({ success: true });
  },

  deleteFile: (folderId, fileId) => {
    const data = JSON.parse(localStorage.getItem(KEY)) || [];
    const folder = data.find(f => f.id === folderId);
    if (folder) {
      folder.files = folder.files.filter(f => f.id !== fileId);
    }
    localStorage.setItem(KEY, JSON.stringify(data));
    return Promise.resolve({ success: true });
  },

  saveFile: (folderId, file) => {
    const data = JSON.parse(localStorage.getItem(KEY)) || [];
    const folder = data.find(f => f.id === folderId);
    if (folder) {
      folder.files = folder.files.map(f => (f.id === file.id ? file : f));
    }
    localStorage.setItem(KEY, JSON.stringify(data));
    return Promise.resolve({ success: true });
  },

  runCode: (file) => {
    // Placeholder for local testing, you can replace with Judge0 API
    return Promise.resolve({ stdout: "// Code executed (mock)", stderr: "" });
  }
};

export default api;

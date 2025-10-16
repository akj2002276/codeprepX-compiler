// Returns boilerplate code based on language and file name
export function getBoilerplate(language, fileName) {
  const baseName = fileName.replace(/\.[^/.]+$/, ""); // Remove extension for class names
  switch (language) {
    case "java":
      return `public class ${baseName} {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`;
    case "cpp":
      return `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}`;
    case "python":
      return `# Write your Python code here\n`;
    case "javascript":
      return `// Write your JavaScript code here\n`;
    default:
      return "";
  }
}

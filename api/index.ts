import path from 'path';
import { exec } from 'child_process';

const express = require('express');
const app = express();

// Hàm dịch và chạy file Java
function compileAndRunJava(): void {
  const javaFilePath = path.join(__dirname, "../backend/src/main/java/com/example/QuanLyThuVien/QuanLyThuVienApplication.java");

  // Lệnh biên dịch file Java
  const compileCommand = `javac ${javaFilePath}`;

  // Biên dịch
  exec(compileCommand, (compileError) => {
    if (compileError) {
      console.error(`Error compiling Java: ${compileError.message}`);
      return; // Dừng thực thi nếu có lỗi biên dịch
    }

    // Lệnh chạy file Java (không cần phần mở rộng .class)
    const className = path.join(__dirname, "../backend/src/main/java");
    const runCommand = `java -cp ${path.dirname(javaFilePath)} com.example.QuanLyThuVien.QuanLyThuVienApplication`;

    // Chạy Java
    exec(runCommand, (runError, stdout, stderr) => {
      if (runError) {
        console.error(`Error running Java: ${runError.message}`);
        return; // Dừng nếu có lỗi khi chạy Java
      }
      console.log('Java Output:', stdout || stderr);
    });


    // Serve your frontend files
    const staticFrontEndPath = path.join(__dirname, '../frontend');
    app.get("/", (req, res) => {
      res.sendFile(path.join(staticFrontEndPath, 'book.html'))
    });
  });
}

compileAndRunJava();

    

app.listen(3007, () => console.log("Server ready on port 3007."));

module.exports = app;
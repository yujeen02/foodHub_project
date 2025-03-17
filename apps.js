const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const port = 3000;
const fs = require("fs");
require("dotenv").config();

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

const saveRoutes = require("./route/saveRoute");
app.use("/save", saveRoutes);

const mainRoutes = require("./route/mainRoute");
app.use("/", mainRoutes);

// 정적 파일 제공
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/views", express.static(path.join(__dirname, "views")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/img", express.static(path.join(__dirname, "img")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine 설정 (EJS 사용)
app.set("view engine", "ejs");

// 메인 페이지
app.get("/", (req, res) => {
  res.render("main/mainPage");
});

// 업로드된 이미지 목록 가져오기 API
app.get("/get-images", (req, res) => {
  const uploadsDir = path.join(__dirname, "img");

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("파일 목록을 읽는 중 오류 발생:", err);
      return res
        .status(500)
        .json({ error: "파일 목록을 불러오지 못했습니다." });
    }

    // 이미지 파일만 필터링 (jpg, png, gif 등)
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    res.json(imageFiles);
  });
});

app.get("/config", (req, res) => {
  res.json({ NCP_CLIENT_ID: process.env.NCP_CLIENT_ID });
});

app.listen(port, () => {
  console.log(port + "포트에서 서버 실행 중...");
});

module.exports = upload;

const mainmodel = require("../models/mainModel");

// main 화면에 등록
const getAllData = async (req, res) => {
  const food = await mainmodel.allData();
  res.render("main/mainPage", { food });
};

// 하나
const getFoodById = async (req, res) => {
  const food = await mainmodel.getOne(req.params.id);
  const foodList = await mainmodel.allData();
  res.render("main/detailPage", { food, foodList });
};

// 이름으로 찾기
const getFoodByName = async (req, res) => {
  const name = req.query.name;
  console.log(name);
  const food = await mainmodel.getByName(name);

  res.render("main/searchPage", { food });
};

module.exports = {
  getAllData,
  getFoodById,
  getFoodByName,
};

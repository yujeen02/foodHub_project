const createData = (event) => {
  event.preventDefault();

  // 데이터 가져오기
  const inputFile = document.querySelector('input[name="image"]').files[0];
  const inputSubFiles = document.querySelector('input[name="subImage"]').files;
  const inputResName = document.querySelector('input[name="resName"]').value;
  const inputTag = document.querySelector('input[name="tag"]').value;
  const inputFoodName = document.querySelector('input[name="foodName"]').value;
  const inputPrice = document.querySelector('input[name="price"]').value;
  const inputAddress = document.querySelector('input[name="address"]').value;
  const inputLatitude = document.querySelector('input[name="latitude"]').value;
  const inputLongitude = document.querySelector(
    'input[name="longitude"]'
  ).value;
  const inputRating = document.querySelector('input[name="rating"]').value;
  const inputCategory = document.querySelector("select[name='category']").value;
  const inputComment = editor.getMarkdown();

  const formData = new FormData();

  formData.append("image", inputFile);
  formData.append("subImage1", inputSubFiles[0]);
  formData.append("subImage2", inputSubFiles[1]);
  formData.append("resName", inputResName);
  formData.append("tag", inputTag);
  formData.append("foodName", inputFoodName);
  formData.append("comment", inputComment);
  formData.append("price", inputPrice);
  formData.append("address", inputAddress);
  formData.append("latitude", inputLatitude);
  formData.append("longitude", inputLongitude);
  formData.append("rating", inputRating);
  formData.append("category", inputCategory);

  //  Axios를 사용 -> 서버로 데이터 전송
  axios({
    method: "post",
    url: "/save/post/test",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => {
      console.log("✅ 등록 성공:", res.data);
      alert("등록 성공");
      window.location.reload();
    })
    .catch((e) => {
      console.error("❌ 등록 실패:", e);
    });
};

// 삭제
const deleteList = (id) => {
  console.log(id);
  axios({
    method: "delete",
    url: `/save/delete/${id}`,
  })
    .then((res) => {
      console.log(res);
      alert("삭제 성공");
      window.location.reload();
    })
    .catch((e) => {
      console.log(e);
    });
};

// 수정페이지로 이동
const updatePage = (id) => {
  window.location.href = `/save/write/${id}`;
};

const editor = new toastui.Editor({
  el: document.querySelector("#content"), // 에디터를 적용할 요소 (컨테이너)
  height: "300px", // 에디터 영역의 높이 값 (OOOpx || auto)
  initialEditType: "markdown", // 최초로 보여줄 에디터 타입 (markdown || wysiwyg)
  initialValue: "음식평을 작성해주세요.", // 내용의 초기 값으로, 반드시 마크다운 문자열 형태여야 함
  previewStyle: "vertical", // 마크다운 프리뷰 스타일 (tab || vertical)
});

const ed = document.querySelector("#editor");
const comment = ed.dataset.inputComment;

const editor = new toastui.Editor({
  el: document.querySelector("#content"), // 에디터를 적용할 요소 (컨테이너)
  height: "300px", // 에디터 영역의 높이 값 (OOOpx || auto)
  initialEditType: "markdown", // 최초로 보여줄 에디터 타입 (markdown || wysiwyg)
  initialValue: comment, // 내용의 초기 값으로, 반드시 마크다운 문자열 형태여야 함
  previewStyle: "vertical", // 마크다운 프리뷰 스타일 (tab || vertical)
});

const updateForm = (id) => {
  const inputFile = document.querySelector('input[name="image"]').files[0];
  const inputSubFile1 = document.querySelector('input[name="subImage1"]')
    .files[0];
  const inputSubFile2 = document.querySelector('input[name="subImage2"]')
    .files[0];
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

  // 이미지가 선택된 경우에만 추가
  if (inputFile) formData.append("image", inputFile);
  if (inputSubFile1) formData.append("subImage1", inputSubFile1);
  if (inputSubFile2) formData.append("subImage2", inputSubFile2);

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

  console.log("수정 요청 데이터:", Object.fromEntries(formData.entries()));

  axios({
    method: "put",
    url: `/save/update/${id}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => {
      console.log("수정 성공:", res.data);
      alert("수정 성공");
      window.location.reload();
    })
    .catch((e) => {
      console.error("수정 실패:", e);
    });
};

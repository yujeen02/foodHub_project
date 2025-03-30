<h1>🍽️ 나만의 맛집 사이트 만들기</h1>

<p><strong>📌 사용자는 원하는 맛집을 확인하고, 관리자는 맛집 정보를 저장 및 수정할 수 있는 웹사이트입니다.</strong><br />
네이버 맵 API를 활용하여 위치 정보를 확인하고, 검색 기능을 통해 원하는 맛집을 손쉽게 찾을 수 있습니다.</p>

<hr />

<h2>🚀 주요 기능</h2>

<h3>🎛 관리자 페이지 (맛집 정보 저장)</h3>
<ul>
  <li>맛집 정보 입력 및 유효성 검사 ✅</li>
  <li>맛집 정보 수정 및 삭제 ✏️</li>
</ul>

<p><strong>📌 유효성 검사</strong><br />- 필수 항목 누락 시 알림창을 통해 사용자에게 경고</p>

<p><strong>📌 저장 버튼 클릭 시</strong><br />- 이미지 및 입력 데이터를 <code>FormData</code>를 활용해 서버로 전송</p>

<p><strong>📌 내용 수정</strong><br />- 기존 데이터 불러오기 및 수정 후 저장 가능</p>

<hr />

<h3>🏠 메인 페이지 (맛집 목록)</h3>
<ul>
  <li>최신 등록된 맛집 목록을 한눈에 확인 가능 🏡</li>
  <li>검색창에서 식당명을 입력하면 원하는 맛집으로 이동 가능 🔍</li>
</ul>

<img src="https://github.com/user-attachments/assets/cba98846-a35a-44ff-936d-cfbc7084843e" alt="맛집 목록" width="600px" style="margin-bottom:10px;" />
<img src="https://github.com/user-attachments/assets/3b123df5-a821-44cb-a4d1-447fc3e92c60" alt="검색 기능" width="600px" />

<hr />

<h3>📍 상세 페이지</h3>
<ul>
  <li><strong>네이버 맵 API</strong>를 활용하여 맛집 위치 확인 가능 🗺️</li>
  <li>추천 맛집을 보며 다른 식당도 함께 탐색 가능 🍜</li>
</ul>

<p><strong>📌 위치 확인 (네이버 맵 API)</strong></p>
<img src="https://github.com/user-attachments/assets/9b56137c-5e94-4d1e-8b4f-17ea18fbb647" alt="네이버맵 위치" width="600px" />

<p><strong>📌 추천 맛집 확인 및 상세 페이지 이동</strong></p>
<img src="https://github.com/user-attachments/assets/08e1e842-9465-4f79-af05-6b5701a4473a" alt="추천 맛집" width="600px" />

<hr />

<h2>🧠 주요 로직 설명</h2>

<h3>📌 데이터 등록 (관리자 페이지)</h3>
<ul>
  <li>사용자가 맛집 정보를 입력하고 저장 버튼 클릭</li>
  <li><code>FormData</code> 객체로 이미지와 텍스트 데이터를 함께 전송</li>
  <li>서버에서는 <code>multer</code>로 이미지를 저장하고, MySQL에 등록</li>
</ul>

<pre>
  <code>
axios.post("/save/post/test", formData, {
headers: { "Content-Type": "multipart/form-data" },
});
  </code>
</pre>


<h3>✅ 유효성 검사 항목</h3>
<ul>
  <li>메인 이미지, 서브 이미지 2장 필수</li>
  <li>가게명, 음식명, 해시태그, 가격, 주소, 위도, 경도, 평점, 음식평 모두 필수 입력</li>
  <li><code>isNaN()</code>을 사용해 숫자 입력 유효성 검사</li>
</ul>

<h3>🗑 데이터 삭제</h3>
<ul>
  <li>삭제 버튼 클릭 시 해당 ID의 데이터를 <code>DELETE</code> 요청</li>
  <li>삭제 후 페이지 새로고침</li>
</ul>

<pre>
  <code>
axios.delete(`/save/delete/${id}`);
  </code>
</pre>

<h3>✏️ 데이터 수정</h3>
<ul>
  <li>수정 버튼 클릭 → input 필드로 전환</li>
  <li>수정 완료 후 <code>PUT</code> 요청 전송</li>
  <li>이미지 미등록 시 기존 이미지 유지</li>
</ul>

<pre>
  <code>
axios.put(`/save/update/${id}`, formData, {
headers: { "Content-Type": "multipart/form-data" },
});
  </code>
</pre>

<h3>📍 네이버 맵 API 연동</h3>
<ul>
  <li>등록된 위도/경도 기반으로 지도에 마커 표시</li>
  <li>마커 클릭 시 해당 맛집 위치 확인 가능</li>
</ul>

---

<h4>🛠 백엔드 구조 (MVC)</h4>
<ul>
  <li><strong>Model:</strong> MySQL 쿼리 정의 (등록, 수정, 삭제, 조회)</li>
  <li><strong>Controller:</strong> 요청 처리 및 렌더링</li>
  <li><strong>Route:</strong> RESTful API 경로 설계</li>
</ul>

---


fetch("/config")
  .then((response) => response.json())
  .then((config) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${config.NCP_CLIENT_ID}&submodules=geocoder`;
    document.head.appendChild(script);

    script.onload = function () {
      console.log("Naver Map API 로드 완료");

      const latitudeEl = document.getElementById("latitude");
      const longitudeEl = document.getElementById("longitude");
      const resNameEl = document.querySelector(".resName");

      if (!latitudeEl || !longitudeEl || !resNameEl) {
        console.error(
          "위도(latitude), 경도(longitude) 또는 식당 이름(resName) 요소를 찾을 수 없습니다."
        );
        return;
      }

      const storeLat = parseFloat(latitudeEl.textContent.trim());
      const storeLng = parseFloat(longitudeEl.textContent.trim());
      const storeName = resNameEl.textContent.trim();

      if (isNaN(storeLat) || isNaN(storeLng)) {
        console.error("위도 또는 경도 값이 유효하지 않습니다.");
        return;
      }

      // 네이버 지도 초기화
      var map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(storeLat, storeLng),
        zoom: 12,
      });

      const storeLocation = new naver.maps.LatLng(storeLat, storeLng);
      map.setCenter(storeLocation);

      var marker = new naver.maps.Marker({
        position: storeLocation,
        map: map,
      });

      var infoWindow = new naver.maps.InfoWindow({
        content: `<div class="infoWindowContent"><h3>${storeName}</h3></div>`,

        maxWidth: 180,
        backgroundColor: "#ffffff",
        borderColor: "#1E90FF",
        borderWidth: 1,
        color: "#333",

        anchorSize: new naver.maps.Size(0, 0),
        pixelOffset: new naver.maps.Point(0, -7),
      });

      infoWindow.open(map, marker);

      console.log(
        `입력된 좌표: ${storeLat.toFixed(6)}, ${storeLng.toFixed(6)}`
      );
    };
  })
  .catch((error) => console.error("Error loading config:", error));

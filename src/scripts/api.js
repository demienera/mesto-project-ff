import { TOKEN, URL, COHORT_ID } from "./constants";

const fetchFromAPI = (paramsURL, config = {}) => {
  return fetch(`${URL}/v1/${COHORT_ID}/${paramsURL}`, {
    method: config.method || "GET",
    headers: {
      authorization: TOKEN,
      ...config.headers,
    },
    body: config.body ? JSON.stringify(config.body) : null,
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Произошла ошибка: ${res.status}`);
    }

    return res.json();
  });
};

export const getUserInfo = () => {
  return fetchFromAPI("users/me");
};

export const getCardList = () => {
  return fetchFromAPI("cards");
};

export const editUserInfo = (name, about) => {
  return fetchFromAPI("users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: { name, about },
  });
};

export const sendNewCard = (newCard) => {
  return fetchFromAPI("cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: newCard,
  });
};

export const deleteCardById = (cardId) => {
  return fetchFromAPI(`cards/${cardId}`, { method: "DELETE" });
};

export const toggleLike = (cardId, isLiked) => {
  return fetchFromAPI(`cards/likes/${cardId}`, {
    method: isLiked ? "DELETE" : "PUT",
  });
};

export const changeAvatar = (url) => {
  return fetchFromAPI("users/me/avatar", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: { avatar: url },
  });
};

export const checkImageUrl = (url) => {
  return fetch(url, {
    method: "HEAD",
  })
    .then((res) => {
      if (!res.ok) {
        return false;
      }
      const contentType = res.headers.get("Content-Type");
      return contentType && contentType.startsWith("image/");
    })
    .catch((error) => {
      console.error("Ошибка проверки URL изображения:", error);
      return false;
    });
};

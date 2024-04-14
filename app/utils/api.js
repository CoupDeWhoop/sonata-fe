import { sonataApi, configureAxiosHeader } from "./apiConfig";
import { refreshTokens, setTokens } from "./auth";

export const handleTokenRefresh = async (apiCall) => {
  try {
    const result = await apiCall();
    return result;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      try {
        const { tokens } = await refreshTokens();
        await setTokens(tokens.accessToken, tokens.refreshToken);
        configureAxiosHeader(tokens.accessToken);
        const result = await apiCall();
        return result;
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError.message);
        throw refreshError;
      }
    } else {
      throw error;
    }
  }
};

export const getLessons = async () => {
  return handleTokenRefresh(async () => {
    const { data } = await sonataApi.get("/lessons/notes");
    return data.lessons;
  });
};

export const getPractises = async () => {
  return handleTokenRefresh(async () => {
    const { data } = await sonataApi.get("/practises");
    return data.practises;
  });
};

export const getAllNotes = () => {
  return handleTokenRefresh(async () => {
    const { data } = await sonataApi.get("/notes");
    return data.notes;
  });
};

export const getPracticeNotes = (practice_id) => {
  return handleTokenRefresh(async () => {
    const { data } = await sonataApi.get(`/practises/${practice_id}/notes`);
    return data.notes;
  });
};
export const postLesson = async (timestamp, duration) => {
  const newLesson = { timestamp };
  if (duration) newLesson["duration"] = duration;
  return handleTokenRefresh(async () => {
    const { data } = await sonataApi.post("/lessons", newLesson);
    return data.lesson;
  });
};

export const deleteLesson = async (lesson_id) => {
  return handleTokenRefresh(async () => {
    const { data } = await sonataApi.delete(`/lessons/${lesson_id}`);
    return data;
  });
};

export const postLessonNote = async (lesson_id, newNote) => {
  return handleTokenRefresh(async () => {
    const { data } = await sonataApi.post(
      `/lessons/${lesson_id}/notes`,
      newNote
    );
    return data.note;
  });
};

export const postPracticeNote = async (
  practice_id,
  learning_focus,
  note_content
) => {
  return handleTokenRefresh(async () => {
    const { data } = await sonataApi.post(`/practises/${practice_id}/notes`, {
      practice_id,
      learning_focus,
      note_content,
    });
    return data.note;
  });
};

export const patchPracticeNote = async (practice_id, note_id, updatedNote) => {
  return handleTokenRefresh(async () => {
    const { data } = await sonataApi.patch(
      `/${practice_id}/notes/{${note_id}`,
      updatedNote
    );
    return data.note;
  });
};

export const postNewPractice = async (timestamp) => {
  return handleTokenRefresh(async () => {
    const { data } = await sonataApi.post("/practises", { timestamp });
    return data.practice;
  });
};

export const finishPractice = async (practice_id, duration) => {
  return handleTokenRefresh(async () => {
    const { data } = await sonataApi.patch(`/practises/${practice_id}`, {
      duration,
    });
    return data.practice;
  });
};

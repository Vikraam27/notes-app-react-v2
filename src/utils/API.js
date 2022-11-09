import { getAccessToken } from './local-storage';

const baseUrl = 'https://notes-api.dicoding.dev/v1';

class FetchAPI {
  static async fetchWithToken(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  static async login({ email, password }) {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: responseJson.message, data: null };
    }

    return { error: null, data: responseJson.data };
  }

  static async register({ name, email, password }) {
    const response = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const { status, message } = await response.json();

    return { status, message };
  }

  static async getUserLogged() {
    const response = await this.fetchWithToken(`${baseUrl}/users/me`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: responseJson.message, data: null };
    }

    return { error: null, data: responseJson.data };
  }

  static async getActiveNotes() {
    const response = await this.fetchWithToken(`${baseUrl}/notes`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: responseJson.message, data: null };
    }

    return { error: null, data: responseJson.data };
  }

  static async addNote({ title, body }) {
    const response = await this.fetchWithToken(`${baseUrl}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: responseJson.message, data: null };
    }

    return { error: null, data: responseJson.data };
  }

  static async getNote(id) {
    const response = await this.fetchWithToken(`${baseUrl}/notes/${id}`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: responseJson.message, data: null };
    }

    return { error: null, data: responseJson.data };
  }

  static async archiveNote(id) {
    const response = await this.fetchWithToken(`${baseUrl}/notes/${id}/archive`, {
      method: 'POST',
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: responseJson.message };
    }

    return { error: null };
  }

  static async unarchiveNote(id) {
    const response = await this.fetchWithToken(`${baseUrl}/notes/${id}/unarchive`, {
      method: 'POST',
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
  }

  static async deleteNote(id) {
    const response = await this.fetchWithToken(`${baseUrl}/notes/${id}`, {
      method: 'DELETE',
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, message: responseJson.message };
    }

    return { error: false, message: responseJson.message };
  }

  static async getArchivedNotes() {
    const response = await this.fetchWithToken(`${baseUrl}/notes/archived`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: response.message, data: null };
    }

    return { error: null, data: responseJson.data };
  }
}

export default FetchAPI;
